import {
  IGame,
  ISession,
  IBoardPosition,
  TCargo,
  IContract,
  IAchievement,
  IMessage,
  IChat,
  TWinCondition,
} from '../../shared/types';

export type TSocketError =
  | 'User not found'
  | 'Game not found'
  | 'Max number of players reached'
  | 'Game already started'
  | 'Not enough players'
  | 'Chat error'
  | 'Other';
export type TSocketConnection = 'Connected' | 'Disconnected';

export interface ServerToClientEvents {
  // Server acknowledges connection
  pushConnection: (message: TSocketConnection) => void;

  // Server sends the current game state
  pushActiveGame: (game: IGame) => void;

  // Server sends the current session
  pushSession: (session: ISession) => void;

  // Server sends current chat object with all messages
  pushActiveChat: (chat: IChat) => void;

  // Server sends an error
  error: (error: TSocketError) => void;
}

export interface ClientToServerEvents {
  // Client adds a new user to the server and creates the session
  createSession: (
    name: string,
    email: string,
    callback: (session: ISession) => void
  ) => void;

  // Client fetches the session from the server. The server will call back with the session object.
  fetchSession: (
    email: string,
    callback: (session: ISession | null) => void
  ) => void;

  //  Client asks to create and join a new game
  createAndJoinNewGame: (
    gameName: string,
    gameTempo: number,
    winCondition: TWinCondition,
    ranked: boolean
  ) => void;

  // Client asks for the active game state. This time we do not use the callback pattern, but emit a push of the game state instead.
  fetchActiveGame: (callback: (success: boolean) => void) => void;

  // Client asks to join an existing game.
  joinGame: (gameUuid: string) => void;

  // Client asks to disconnect from an existing game.
  leaveGame: () => void;

  // Client asks to remove player from an existing game.
  yieldGame: () => void;

  // Client asks to start the currently active game
  startGame: () => void;

  // Client asks to start the currently active game
  endRound: () => void;

  // Client asks to move current player to a new position on the board. This returns a callback with a boolean true/false wether move is allowed.
  sailTo: (
    position: IBoardPosition,
    callback: (valid: boolean) => void
  ) => void;

  // Client asks to complete a sequence of trade, ditch and load. This returns a callback with a boolean true/false whether the action could be completed.
  tradeDitchLoad: (
    contractsToTrade: IContract[],
    cargoToDitch: TCargo[],
    cargoToLoad: TCargo[],
    callback: (valid: boolean) => void
  ) => void;

  // Client asks to pick an achievement. This returns a callback with a boolean true/false whether the pick could be made. It also finally ends a round.
  pickAchievement: (
    achievement: IAchievement,
    callback: (valid: boolean) => void
  ) => void;

  // Client asks to end game. This set the state of the game to 'not started', clears the session from the game, and disconnects all user sockets from that game.
  endGame: () => void;

  // Client sends a chat message.
  sendMessage: (message: IMessage) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
