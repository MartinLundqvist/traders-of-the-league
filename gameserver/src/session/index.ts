import {
  IAchievement,
  IBoardPosition,
  IChat,
  IContract,
  IMessage,
  IRanking,
  ISession,
  IUser,
  TCargo,
} from '../../../shared/types';
import { GameStore } from '../stores/gameStore';
import { SessionStore } from '../stores/sessionStore';
import { TGameServer, TGameSocket } from '../types';
import { nanoid } from 'nanoid';
import { GameEngine } from '../game-engine';
import { ChatStore } from 'src/stores/chatStore';
import { RankingStore } from 'src/stores/rankingStore';

export class GameSession implements ISession {
  // Core ISession properties
  uuid: string;
  user: IUser;
  email: string;
  activeGameUuid: string;

  // References to the socket server and the socket itself
  private io: TGameServer;
  private socket: TGameSocket;

  // References to the stores
  private gameStore: GameStore;
  private sessionStore: SessionStore;
  private chatStore: ChatStore;
  private rankingStore: RankingStore;

  constructor(
    io: TGameServer,
    socket: TGameSocket,
    sessionStore: SessionStore,
    gameStore: GameStore,
    chatStore: ChatStore,
    rankingStore: RankingStore
  ) {
    this.io = io;
    this.socket = socket;

    this.gameStore = gameStore;
    this.sessionStore = sessionStore;
    this.chatStore = chatStore;
    this.rankingStore = rankingStore;

    // Initialize the properties with empty values for now.
    this.uuid = '';
    this.user = { name: '', uuid: '', connected: true };
    this.activeGameUuid = '';
    this.email = '';

    console.log('New connection identified - socket ID is' + this.socket.id);

    // Emit a connection confirmation to the frontend, this will trigger the frontend to fetch a sessionId OR ask to create a new session
    this.socket.emit('pushConnection', 'Connected');

    // Register listeners
    this.socket.on(
      'createSession',
      (name: string, email: string, callback: (session: ISession) => void) =>
        this.createSession(name, email, callback)
    );
    this.socket.on(
      'fetchSession',
      (email: string, callback: (session: ISession | null) => void) =>
        this.fetchSession(email, callback)
    );
    this.socket.on('createAndJoinNewGame', (gameName: string) =>
      this.createAndJoinNewGame(gameName)
    );
    this.socket.on('fetchActiveGame', (callback: (success: boolean) => void) =>
      this.fetchActiveGame(callback)
    );
    this.socket.on('joinGame', (gameUuid: string) => this.joinGame(gameUuid));
    this.socket.on('leaveGame', () => this.leaveGame());
    this.socket.on('yieldGame', () => this.yieldGame());
    this.socket.on('startGame', () => this.startGame());
    this.socket.on('endRound', () => this.endRound());
    this.socket.on(
      'sailTo',
      (position: IBoardPosition, callback: (valid: boolean) => void) =>
        this.sailTo(position, callback)
    );

    this.socket.on(
      'tradeDitchLoad',
      (
        contractsToTrade: IContract[],
        cargoToDitch: TCargo[],
        cargoToLoad: TCargo[],
        callback: (valid: boolean) => void
      ) =>
        this.tradeDitchLoad(
          contractsToTrade,
          cargoToDitch,
          cargoToLoad,
          callback
        )
    );
    this.socket.on(
      'pickAchievement',
      (achievement: IAchievement, callback: (valid: boolean) => void) =>
        this.pickAchievement(achievement, callback)
    );
    this.socket.on('endGame', () => this.endGame());
    this.socket.on('sendMessage', (message: IMessage) =>
      this.sendMessage(message)
    );
    this.socket.on('disconnect', () => this.disconnect());
  }

  private disconnect() {
    console.log('User ' + this.user.name + ' disconnected.');

    // Set user as disconnected and update the session store
    this.user.connected = false;

    // Only persist the session if it's actually a valid session!
    if (this.uuid.length < 1) return;

    this.persistThisSession();
  }

  private async createSession(
    name: string,
    email: string,
    callback: (session: ISession) => void
  ) {
    // Create the session
    let newSession: ISession = {
      user: { name, uuid: nanoid(), connected: true },
      uuid: nanoid(),
      email: email,
      activeGameUuid: '',
    };

    // Persist it
    await this.sessionStore.saveSession(newSession);

    // And update the local properties (deeply)
    this.uuid = newSession.uuid;
    this.user.uuid = newSession.user.uuid;
    this.user.name = newSession.user.name;
    this.activeGameUuid = ''; // Not strictly required, but clean
    this.email = newSession.email;

    // And finally callback to the frontend
    callback(newSession);
  }

  private pushThisSession() {
    const thisSession: ISession = {
      uuid: this.uuid,
      user: this.user,
      activeGameUuid: this.activeGameUuid,
      email: this.email,
    };

    this.socket.emit('pushSession', thisSession);
  }

  private async persistThisSession() {
    await this.sessionStore.saveSession({
      user: this.user,
      activeGameUuid: this.activeGameUuid,
      uuid: this.uuid,
      email: this.email,
    });
  }

  private async fetchSession(
    email: string,
    callback: (session: ISession | null) => void
  ) {
    // We also need to initialize the local session properties
    // TODO: This is a bit unelegant..

    // This is to prevent accidental dealings with bad sessions.
    if (!email || email.length < 2) {
      callback(null);
    }

    const fetchedSession = await this.sessionStore.getSession(email);

    if (fetchedSession) {
      // Update the local session
      this.uuid = fetchedSession.uuid;
      this.user = {
        name: fetchedSession.user.name,
        uuid: fetchedSession.user.uuid,
        connected: true,
      };
      this.activeGameUuid = fetchedSession.activeGameUuid;
      this.email = fetchedSession.email;

      // Remember to update the store with the user connection status
      fetchedSession.user.connected = true;
      this.persistThisSession();
    }

    callback(fetchedSession);
  }

  private async createAndJoinNewGame(gameName: string) {
    // Create a new game object with initial values

    const newGame = GameEngine.createGame(gameName, nanoid());

    // Persist the game in the game store
    await this.gameStore.saveGame(newGame);

    // Have user join the game
    this.joinGame(newGame.uuid);
  }

  private async fetchActiveGame(callback: (success: boolean) => void) {
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!game) {
      console.log('No such game exists');
      callback(false);
      return;
    }

    this.socket.join(this.activeGameUuid);

    callback(true);
    this.pushActiveGame();
  }

  private async pushActiveGame() {
    // Get the game from the store
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    //TODO: Refactor

    if (game.state.status === 'won' && game.isRanked) {
      this.updateRankings(game.uuid);
    }

    // Emit the new game state to all user sockets in the game rooom
    this.io.to(this.activeGameUuid).emit('pushActiveGame', game);

    // Also, emit the current chat object in case a user had to reconnect
    this.pushActiveChat();
  }

  private async updateRankings(gameUuid: string) {
    console.log('Ranking users for game ' + gameUuid);
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!game) {
      console.log('Game not found - skipping ranking');
      return;
    }

    const playerUuids = game.players.map((player) => player.user.uuid);

    const existingRankings = await this.rankingStore.getNamedRankings(
      playerUuids
    );
    const updatedRankings: IRanking[] = GameEngine.getUpdatedRankings(
      game,
      existingRankings
    );

    for (const ranking of updatedRankings) {
      await this.rankingStore.saveRanking(ranking);
    }
  }

  private async joinGame(gameUuid: string) {
    // Fetch the game from the store
    const game = await this.gameStore.getGame(gameUuid);
    if (!game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Check if the game is waiting to start
    if (game.state.status !== 'waiting') {
      this.socket.emit('error', 'Game already started');
      return;
    }

    // Check if the game has reaced max number of players
    if (game.players.length > 4) {
      this.socket.emit('error', 'Max number of players reached');
      return;
    }

    // Add the player
    const newPlayer = GameEngine.addPlayerToGame(this.user, game);
    game.players.push(newPlayer);

    await this.gameStore.saveGame(game);

    // Update local session
    this.activeGameUuid = gameUuid;

    // Make sure the user socket joins the game room
    this.socket.join(gameUuid);

    // Persist the new session
    this.persistThisSession();

    // Push it
    this.pushThisSession();

    // And finally push the game status to the frontend
    this.pushActiveGame();
  }

  private async startGame() {
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    if (game.players.length < 2) {
      this.socket.emit('error', 'Not enough players');
      return;
    }

    // Initialize the game state. This player is first to go, since they started the game.
    GameEngine.start(game, this.user.uuid);

    await this.gameStore.saveGame(game);

    this.pushActiveGame();
  }

  private async endRound() {
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    GameEngine.processEndOfRoundAchievements(game);

    await this.gameStore.saveGame(game);

    this.pushActiveGame();
  }

  private async sailTo(
    position: IBoardPosition,
    callback: (valid: boolean) => void
  ) {
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Have the engine figure out wether it is a valid move, and if so, execute it.
    let validMove = GameEngine.sailCurrentPlayerTo(game, position);

    if (validMove) {
      // If the move is valid, we persist and push the new game state
      await this.gameStore.saveGame(game);
      this.pushActiveGame();
    }

    // Finally, we callback with a confirmation.?????
    callback(validMove);
  }

  private async tradeDitchLoad(
    contractsToTrade: IContract[],
    cargoToDitch: TCargo[],
    cargoToLoad: TCargo[],
    callback: (valid: boolean) => void
  ) {
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Have the engine figure out wether these are valid trades, and if so, execute them.
    let validActions = GameEngine.tradeDitchLoadForCurrentPlayer(
      game,
      contractsToTrade,
      cargoToDitch,
      cargoToLoad
    );

    if (validActions) {
      // If the move is valid, we persist and push the new game state
      await this.gameStore.saveGame(game);
      this.pushActiveGame();
    }

    // Finally, we callback with a confirmation.?????
    callback(validActions);
  }

  private async pickAchievement(
    achievement: IAchievement,
    callback: (valid: boolean) => void
  ) {
    console.log('Picking achievement!');
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Have the engine figure out wether these are valid trades, and if so, execute them.
    let validPick = GameEngine.pickAchievementForCurrentPlayer(
      game,
      achievement
    );

    if (validPick) {
      // If the move is valid, we persist and push the new game state
      await this.gameStore.saveGame(game);
      this.pushActiveGame();
    }

    // Finally, we callback with a confirmation.?????
    callback(validPick);
  }

  private async yieldGame() {
    console.log('Yielding the game ' + this.activeGameUuid);

    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // If this is the last player, we terminate the game
    if (game.players.length === 1) {
      this.endGame();
      return;
    }

    // First eliminate the player from the game state
    GameEngine.removeUserUuidFromGame(this.user.uuid, game);

    // Persist and push the new game state
    await this.gameStore.saveGame(game);
    await this.pushActiveGame();

    // Then disconnect from session
    this.leaveGame();
  }

  private async leaveGame() {
    console.log('Leaving the game ' + this.activeGameUuid);

    if (!this.activeGameUuid) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Leave the room
    this.socket.leave(this.activeGameUuid);

    // Remove the activegame reference and persist the session
    this.activeGameUuid = '';

    await this.persistThisSession();

    // And update the client.
    this.pushThisSession();
  }

  private async endGame() {
    console.log('Ending the game ' + this.activeGameUuid);
    const game = await this.gameStore.getGame(this.activeGameUuid);

    if (!game || !this.activeGameUuid) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    GameEngine.terminate(game);
    await this.gameStore.saveGame(game);

    this.pushActiveGame();

    // // Send message to all players that the game has been terminated
    // this.io.to(this.activeGameUuid).emit('gameTerminated');

    // this.leaveGame();
  }

  private async pushActiveChat() {
    // Get the game from the store
    const chat = await this.chatStore.getChat(this.activeGameUuid);

    if (!chat) {
      // this.socket.emit('error', 'Chat error');
      return;
    }

    // Emit the new game state to all user sockets in the game rooom
    this.io.to(this.activeGameUuid).emit('pushActiveChat', chat);
  }

  private async sendMessage(message: IMessage) {
    if (!message) {
      this.socket.emit('error', 'Chat error');
      return;
    }

    message.uuid = nanoid();

    let chat = await this.chatStore.getChat(this.activeGameUuid);

    if (!chat) {
      console.log('No chat created yet. Creating one.');
      // Create a chat object for the game
      const newChat: IChat = {
        gameUuid: this.activeGameUuid,
        messages: [],
      };

      chat = newChat;
    }

    // Now we know it exists...
    chat.messages.push(message);

    await this.chatStore.saveChat(chat!);

    // Finally push the chats
    this.pushActiveChat();
  }
}
