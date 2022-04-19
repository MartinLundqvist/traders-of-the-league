import { IGame, ISession, IBoardPosition } from '../../shared/types';

export type TSocketError =
  | 'User not found'
  | 'Game not found'
  | 'Max number of players reached'
  | 'Not enough players'
  | 'Other';
export type TSocketConnection = 'Connected' | 'Disconnected';

export interface ServerToClientEvents {
  // Server acknowledges connection
  pushConnection: (message: TSocketConnection) => void;

  // Server sends the current game state
  pushActiveGame: (game: IGame) => void;

  // Server sends an error
  error: (error: TSocketError) => void;
}

export interface ClientToServerEvents {
  // Client adds a new user to the server and creates the session
  createSession: (name: string, callback: (session: ISession) => void) => void;

  // Client fetches the session from the server. The server will call back with the session object.
  fetchSession: (
    sessionId: string,
    callback: (session: ISession | undefined) => void
  ) => void;

  //  Client asks to create and join a new game
  createAndJoinNewGame: (gameName: string) => void;

  // Client asks for the active game state. This time we do not use the callback pattern, but emit a push of the game state instead.
  fetchActiveGame: () => void;

  // Client asks to join an existing game.
  joinGame: (gameUuid: string) => void;

  // Client asks to start the currently active game
  startGame: () => void;

  // Client asks to start the currently active game
  endRound: () => void;

  // Client asks to move current player to a new position on the board. This returns a callback with a boolean true/false wether move is allowed.
  sailTo: (
    position: IBoardPosition,
    callback: (valid: boolean) => void
  ) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
