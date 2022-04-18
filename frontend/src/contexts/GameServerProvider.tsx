import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Socket, io } from 'socket.io-client';
import {
  ClientToServerEvents,
  IGame,
  ISession,
  ServerToClientEvents,
  TSocketConnection,
  TSocketError,
} from '../../../shared/types';

export type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

interface IGameServerContext {
  session: ISession;
  game: IGame | null;
  createSession: (playerName: string) => void;
  createAndJoinNewGame: (gameName: string) => void;
}

const initialContext: IGameServerContext = {
  session: {
    uuid: '',
    user: {
      name: '',
      uuid: '',
      connected: false,
    },
    activeGameUuid: '',
  },
  game: null,
  createSession: () => {},
  createAndJoinNewGame: () => {},
};

const GameServerContext = createContext<IGameServerContext>(initialContext);

export const useGameServer = () => useContext(GameServerContext);

interface IGameServerProviderProps {
  children: React.ReactNode;
}

export const GameServerProvider = ({ children }: IGameServerProviderProps) => {
  const [session, setSession] = useState<ISession>(initialContext.session);
  const [game, setGame] = useState<IGame | null>(initialContext.game);
  const socketRef = useRef<ChatSocket>();

  const onAnyListener = useCallback((event: any, args: any[]) => {
    console.log(event, args);
  }, []);

  const onErrorListener = useCallback((error: TSocketError) => {
    console.log('GameServer Error: ' + error);
  }, []);

  const onPushConnectionListener = useCallback((message: TSocketConnection) => {
    let connected = message === 'Connected';

    setSession((session) => ({
      ...session,
      user: { ...session.user, connected },
    }));
  }, []);

  const onPushActiveGameListener = useCallback((game: IGame) => {
    console.log('Updated game received');
    setGame(game);
  }, []);

  // This hook initializes the socket on first render of the Provider
  useEffect(() => {
    // First we connect to the server
    const URL = import.meta.env.VITE_URL || '';

    // console.log(import.meta.env);
    console.log('Connecting to ' + URL);
    socketRef.current = io(URL);

    // Then we initilalize all listeners

    socketRef.current?.onAny(onAnyListener);
    socketRef.current?.on('error', onErrorListener);
    socketRef.current?.on('pushConnection', onPushConnectionListener);
    socketRef.current?.on('pushActiveGame', onPushActiveGameListener);

    // Now we figure out if there is an existing session we can use
    let sessionUuid = window.localStorage.getItem('sessionUuid');

    if (sessionUuid) {
      socketRef.current.emit('fetchSession', sessionUuid, (session) => {
        if (!session) {
          console.log(
            'No session found on game server with uuid ' + sessionUuid
          );
        } else {
          console.log(
            'Session found and restored for user ' + session.user.name
          );

          setSession(session);

          // Also, if there exists an active game, we will ask the server to push it to us.

          if (session.activeGameUuid) {
            console.log('Found an active game, asking for it to be pushed.');
            socketRef.current?.emit('fetchActiveGame');
          }
        }
      });
    }

    // Clean up all listeners
    return () => {
      socketRef.current?.offAny(onAnyListener);
      socketRef.current?.off('error', onErrorListener);
      socketRef.current?.off('pushConnection', onPushConnectionListener);
      socketRef.current?.off('pushActiveGame', onPushActiveGameListener);
    };
  }, []);

  const createSession = (playerName: string) => {
    if (playerName.length < 3) {
      window.alert('Name needs to be at least 2 characters long.');
      return;
    }
    console.log('Creating a new session for user ' + playerName);
    socketRef.current?.emit('createSession', playerName, (session) => {
      // Update the local storage
      window.localStorage.setItem('sessionUuid', session.uuid);

      // Update application state
      setSession(session);

      console.log('New session received');
    });
  };

  const createAndJoinNewGame = (gameName: string) => {
    if (gameName.length < 3) {
      window.alert('Name needs to be at least 2 characters long.');
      return;
    }
    console.log('Creating a new game with name ' + gameName);
    socketRef.current?.emit('createAndJoinNewGame', gameName);
  };

  return (
    <GameServerContext.Provider
      value={{ session, game, createSession, createAndJoinNewGame }}
    >
      {children}
    </GameServerContext.Provider>
  );
};
