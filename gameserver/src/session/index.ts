import { IGame, ISession, IUser } from '../../../shared/types';
import { GameStore } from '../stores/gameStore';
import { SessionStore } from '../stores/sessionStore';
import { TGameServer } from '../types';
import { nanoid } from 'nanoid';
import { BOARD } from '../../../shared/constants';
import { addPlayerToGame } from '../../../shared/utils/addPlayerToGame';
import { GameEngine } from '../game-engine';

export class GameSession implements ISession {
  // Core ISession propertues
  uuid: string;
  user: IUser;
  activeGameUuid: string;

  // References to the socket server and the socket itself
  private io: TGameServer;
  private socket: TGameServer;

  // References to the stores
  private gameStore: GameStore;
  private sessionStore: SessionStore;

  constructor(
    io: TGameServer,
    socket: TGameServer,
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
    this.socket.on('fetchActiveGame', () => this.pushActiveGame());
    this.socket.on('joinGame', (gameUuid: string) => this.joinGame(gameUuid));
    this.socket.on('startGame', () => this.startGame());
    this.socket.on('endMove', () => this.endMove());
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
    const newGame: IGame = {
      name: gameName,
      uuid: nanoid(),
      players: [],
      board: BOARD,
      state: {
        currentPlayerUuid: '',
        round: 0,
        started: false,
        status: 'waiting',
      },
    };

    // Persist the game in the game store
    this.gameStore.saveGame(newGame);

    // Have user join the game
    this.joinGame(newGame.uuid);
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
    game.players.push(addPlayerToGame(this.user, game));
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

  private endMove() {
    const game = this.gameStore.getGame(this.activeGameUuid);

    if (!this.activeGameUuid || !game) {
      this.socket.emit('error', 'Game not found');
      return;
    }

    GameEngine.endMove(game, this.user.uuid);

    this.gameStore.saveGame(game);

    this.pushActiveGame();
  }
}
