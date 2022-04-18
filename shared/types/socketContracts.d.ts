import { IGame, ISession } from '../../shared/types';

export type TSocketError = 'User not found' | 'Game not found' | 'Other';
export type TSocketConnection = 'Connected' | 'Disconnected';

export interface ServerToClientEvents {
  // Server acknowledges connection
  pushConnection: (message: TSocketConnection) => void;
  // Server sends the current game state
  pushActiveGame: (game: IGame) => void;
  //   // Server sends current list of users
  //   pushUsers: (users: IUser[]) => void;
  //   // Server sends current list of rooms
  //   pushRooms: (rooms: IRoom[]) => void;
  //   // Server sends messages for a specific room or private chat
  //   pushMessage: (message: IMessage) => void;
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
  //   // Client asks for all messages to a particular Messenger (room or user), the server calls back with the list
  //   fetchMessagesTo: (
  //     messenger: IMessenger,
  //     callback: (messages: IMessage[]) => void
  //   ) => void;
  //   // Client asks for all messages between two messengers (rooms or users), the server calls back with the list
  //   fetchMessagesBetween: (
  //     messenger1: IMessenger,
  //     messenger2: IMessenger,
  //     callback: (messages: IMessage[]) => void
  //   ) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

// export type ServerIO = Server<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >;
// export type ServerSocket = Socket<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >;
// export type ChatSocket = ClientSocket<
//   ServerToClientEvents,
//   ClientToServerEvents
// >;
