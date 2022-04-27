import {
  IAchievement,
  IBoardPosition,
  IContract,
  ISession,
  IUser,
  TCargo,
} from '../../../shared/types';
import { GameStore } from '../stores/gameStore';
import { SessionStore } from '../stores/sessionStore';
import { TGameServer, TGameSocket } from '../types';
import { nanoid } from 'nanoid';
import { GameEngine } from '../game-engine';

export class GameSession implements ISession {
  // Core ISession propertues
  uuid: string;
  user: IUser;
  activeGameUuid: string;

  // References to the socket server and the socket itself
  private io: TGameServer;
  private socket: TGameSocket;

  // References to the stores
  private gameStore: GameStore;
  private sessionStore: SessionStore;

  constructor(
    io: TGameServer,
    socket: TGameSocket,
    sessionStore: SessionStore,
    gameStore: GameStore
  ) {
    this.io = io;
    this.socket = socket;

    this.gameStore = gameStore;
    this.sessionStore = sessionStore;

    // Initialize the properties with empty values for now.
    this.uuid = '';
    this.user = { name: '', uuid: '', connected: true };
    this.activeGameUuid = '';

    console.log('New connection identified - socket ID is' + this.socket.id);

    // Emit a connection confirmation to the frontend, this will trigger the frontend to fetch a sessionId OR ask to create a new session
    this.socket.emit('pushConnection', 'Connected');

    // Register listeners
    this.socket.on(
      'createSession',
      (name: string, callback: (session: ISession) => void) =>
        this.createSession(name, callback)
    );
    this.socket.on(
      'fetchSession',
      (
        sessionUuid: string,
        callback: (session: ISession | undefined) => void
      ) => this.fetchSession(sessionUuid, callback)
    );
    this.socket.on('createAndJoinNewGame', (gameName: string) =>
      this.createAndJoinNewGame(gameName)
    );
    this.socket.on('fetchActiveGame', (callback: (success: boolean) => void) =>
      this.fetchActiveGame(callback)
    );
    this.socket.on('joinGame', (gameUuid: string) => this.joinGame(gameUuid));
    this.socket.on('startGame', () => this.startGame());
    this.socket.on('endRound', () => this.endRound());
    this.socket.on(
      'sailTo',
      (position: IBoardPosition, callback: (valid: boolean) => void) =>
        this.sailTo(position, callback)
    );
    this.socket.on(
      'loadCargo',
      (cargo: TCargo[], callback: (valid: boolean) => void) =>
        this.loadCargo(cargo, callback)
    );
    this.socket.on(
      'ditchCargo',
      (cargo: TCargo[], callback: (valid: boolean) => void) =>
        this.ditchCargo(cargo, callback)
    );
    this.socket.on(
      'makeTrades',
      (contracts: IContract[], callback: (valid: boolean) => void) =>
        this.makeTrades(contracts, callback)
    );
    this.socket.on(
      'pickAchievement',
      (achievement: IAchievement, callback: (valid: boolean) => void) =>
        this.pickAchievement(achievement, callback)
    );
    this.socket.on('disconnect', () => this.disconnect());
  }

  private disconnect() {
    console.log('User ' + this.user.name + ' disconnected.');

    // Set user as disconnected and update the session store
    this.user.connected = false;
    this.persistThisSession();

    // Remove the user socket from all rooms. A new socket will be created upon reconnecting.
  }

  private createSession(name: string, callback: (session: ISession) => void) {
    // Create the session
    let newSession: ISession = {
      user: { name, uuid: nanoid(), connected: true },
      uuid: nanoid(),
      activeGameUuid: '',
    };

    // Persist it
    this.sessionStore.saveSession(newSession);

    // And update the local properties (deeply)
    this.uuid = newSession.uuid;
    this.user.uuid = newSession.user.uuid;
    this.user.name = newSession.user.name;
    this.activeGameUuid = ''; // Not strictly required, but clean

    // And finally callback to the frontend
    callback(newSession);
  }

  private persistThisSession() {
    this.sessionStore.saveSession({
      user: this.user,
      activeGameUuid: this.activeGameUuid,
      uuid: this.uuid,
    });
  }

  private fetchSession(
    sessionUuid: string,
    callback: (session: ISession | undefined) => void
  ) {
    // We also need to initialize the local session properties
    // TODO: This is a bit unelegant..
    const fetchedSession = this.sessionStore.getSession(sessionUuid);
    if (fetchedSession) {
      this.uuid = fetchedSession.uuid;
      this.user = {
        name: fetchedSession.user.name,
        uuid: fetchedSession.user.uuid,
        connected: true,
      };
      this.activeGameUuid = fetchedSession.activeGameUuid;
    }

    callback(fetchedSession);
  }

  private createAndJoinNewGame(gameName: string) {
    // Create a new game object with initial values

    const newGame = GameEngine.createGame(gameName, nanoid());

    // Persist the game in the game store
    this.gameStore.saveGame(newGame);

    // Have user join the game
    this.joinGame(newGame.uuid);
  }

  private fetchActiveGame(callback: (success: boolean) => void) {
    const game = this.gameStore.getGame(this.activeGameUuid);

    if (!game) {
      console.log('No such game exists');
      callback(false);
      return;
    }

    this.socket.join(this.activeGameUuid);

    callback(true);

    this.pushActiveGame();
  }

  private pushActiveGame() {
    // Get the game from the store
    const game = this.gameStore.getGame(this.activeGameUuid);

    if (!game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Emit the new game state to all user sockets in the game rooom
    this.io.to(this.activeGameUuid).emit('pushActiveGame', game);
  }

  private joinGame(gameUuid: string) {
    // Fetch the game from the store
    const game = this.gameStore.getGame(gameUuid);
    if (!game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Add the player to the game
    if (game.players.length > 4) {
      this.socket.emit('error', 'Max number of players reached');
      return;
    }

    const newPlayer = GameEngine.addPlayerToGame(this.user, game);
    game.players.push(newPlayer);

    this.gameStore.saveGame(game);

    // Update local session
    this.activeGameUuid = gameUuid;

    // Make sure the user socket joins the game room
    this.socket.join(gameUuid);

    // Persist the new session
    this.persistThisSession();

    // And finally push the game status to the frontend
    this.pushActiveGame();
  }

  private startGame() {
    const game = this.gameStore.getGame(this.activeGameUuid);

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

    this.gameStore.saveGame(game);

    this.pushActiveGame();
  }

  private endRound() {
    const game = this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    GameEngine.processEndOfRoundAchievements(game);

    this.gameStore.saveGame(game);

    this.pushActiveGame();
  }

  private sailTo(position: IBoardPosition, callback: (valid: boolean) => void) {
    const game = this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Have the engine figure out wether it is a valid move, and if so, execute it.
    let validMove = GameEngine.sailCurrentPlayerTo(game, position);

    if (validMove) {
      // If the move is valid, we persist and push the new game state
      this.gameStore.saveGame(game);
      this.pushActiveGame();
    }

    // Finally, we callback with a confirmation.?????
    callback(validMove);
  }

  private loadCargo(cargo: TCargo[], callback: (valid: boolean) => void) {
    const game = this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Have the engine figure out wether it is a valid move, and if so, execute it.
    let validMove = GameEngine.loadCargoForCurrentPlayer(game, cargo);

    if (validMove) {
      // If the move is valid, we persist and push the new game state
      this.gameStore.saveGame(game);
      this.pushActiveGame();
    }

    // Finally, we callback with a confirmation.?????
    callback(validMove);
  }

  private ditchCargo(cargo: TCargo[], callback: (valid: boolean) => void) {
    const game = this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Have the engine figure out wether it is a valid move, and if so, execute it.
    let validMove = GameEngine.ditchCargoForCurrentPlayer(game, cargo);

    if (validMove) {
      // If the move is valid, we persist and push the new game state
      this.gameStore.saveGame(game);
      this.pushActiveGame();
    }

    // Finally, we callback with a confirmation.?????
    callback(validMove);
  }

  private makeTrades(
    contracts: IContract[],
    callback: (valid: boolean) => void
  ) {
    const game = this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    // Have the engine figure out wether these are valid trades, and if so, execute them.
    let validTrade = GameEngine.makeTradesForCurrentPlayer(game, contracts);

    if (validTrade) {
      // If the move is valid, we persist and push the new game state
      this.gameStore.saveGame(game);
      this.pushActiveGame();
    }

    // Finally, we callback with a confirmation.?????
    callback(validTrade);
  }

  private pickAchievement(
    achievement: IAchievement,
    callback: (valid: boolean) => void
  ) {
    console.log('Picking achievement!');
    const game = this.gameStore.getGame(this.activeGameUuid);

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
      this.gameStore.saveGame(game);
      this.pushActiveGame();
    }

    // Finally, we callback with a confirmation.?????
    callback(validPick);
  }
}
