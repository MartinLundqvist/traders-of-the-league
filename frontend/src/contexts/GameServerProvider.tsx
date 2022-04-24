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
  IBoardPosition,
  ICity,
  IContract,
  IGame,
  IPlayer,
  ISession,
  ServerToClientEvents,
  TCargo,
  TSocketConnection,
  TSocketError,
} from '../../../shared/types';

export type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

interface IGameServerContext {
  session: ISession;
  game: IGame | null;
  createSession: (playerName: string) => void;
  createAndJoinNewGame: (gameName: string) => void;
  joinGame: (gameUuid: string) => void;
  startGame: () => void;
  endRound: () => void;
  isMyTurn: boolean;
  isMyGameToStart: boolean;
  sailTo: (position: IBoardPosition) => void;
  isInCity: boolean;
  currentCity: ICity | null;
  currentPlayer: IPlayer | null;
  loadCargo: (cargo: TCargo[]) => void;
  ditchCargo: (cargo: TCargo[]) => void;
  makeTrades: (contracts: IContract[]) => void;
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
  joinGame: () => {},
  startGame: () => {},
  endRound: () => {},
  isMyTurn: false,
  isMyGameToStart: false,
  sailTo: () => {},
  isInCity: false,
  currentCity: null,
  currentPlayer: null,
  loadCargo: () => {},
  ditchCargo: () => {},
  makeTrades: () => {},
};

const GameServerContext = createContext<IGameServerContext>(initialContext);

export const useGameServer = () => useContext(GameServerContext);

interface IGameServerProviderProps {
  children: React.ReactNode;
}

export const GameServerProvider = ({ children }: IGameServerProviderProps) => {
  const [session, setSession] = useState<ISession>(initialContext.session);
  const [game, setGame] = useState<IGame | null>(initialContext.game);
  const [isMyTurn, setIsMyTurn] = useState(initialContext.isMyTurn);
  const [isMyGameToStart, setIsMyGameToStart] = useState(
    initialContext.isMyGameToStart
  );
  const [isInCity, setIsInCity] = useState(initialContext.isInCity);
  const [currentCity, setCurrentCity] = useState(initialContext.currentCity);
  const [currentPlayer, setCurrentPlayer] = useState(
    initialContext.currentPlayer
  );
  const socketRef = useRef<ChatSocket>();

  const onAnyListener = useCallback((event: any, args: any[]) => {
    console.log(event, args);
  }, []);

  const onErrorListener = useCallback((error: TSocketError) => {
    console.log('GameServer Error: ' + error);
    window.alert(error);
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
            socketRef.current?.emit('fetchActiveGame', (success) => {
              if (!success) {
                window.alert('The game you last played seems to have ended!');
              }
            });
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

  // This hook modifies booleans for rendering purposes
  // TODO: Perhaps this should be refactored to the useLayout context?
  useEffect(() => {
    let myTurn = false;
    let myGameToStart = false;
    let isInCity = false;
    let currentCity: ICity | null = null;
    let currentPlayer: IPlayer | null = null;
    if (game && session) {
      myTurn = session.user.uuid === game.state.currentRound.playerUuid;
      currentPlayer =
        game.players.find((player) => player.user.uuid === session.user.uuid) ||
        null;
      myGameToStart =
        session.user.uuid === game.players[0].user.uuid && !game.state.started;

      const currentPosition = game.players.find(
        (player) => player.user.uuid === session.user.uuid
      )?.position;
      if (currentPosition) {
        const currentHex = game.board.find((hex) => {
          return (
            hex.row === currentPosition.row &&
            hex.column === currentPosition?.column
          );
        });

        if (currentHex && currentHex.city) {
          isInCity = true;
          currentCity = currentHex.city;
        }
      }
    }

    setIsMyGameToStart(myGameToStart);
    setIsMyTurn(myTurn);
    setIsInCity(isInCity);
    setCurrentCity(currentCity);
    setCurrentPlayer(currentPlayer);
  }, [game]);

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

  const joinGame = (gameUuid: string) => {
    if (gameUuid.length < 21) {
      window.alert('ID is too short, try again.');
      return;
    }
    console.log('Joining existing game with Uuid ' + gameUuid);
    socketRef.current?.emit('joinGame', gameUuid);
  };

  const startGame = () => {
    if (!game) {
      window.alert('No game to start');
      return;
    }

    console.log('Starting game ' + game.name);
    socketRef.current?.emit('startGame');
  };

  const endRound = () => {
    let confirmed = window.confirm('Are you sure you want to end your move?');

    if (!confirmed) return;

    console.log('Ending move');
    socketRef.current?.emit('endRound');
  };

  const sailTo = (position: IBoardPosition) => {
    console.log('Sailing to ' + JSON.stringify(position));

    socketRef.current?.emit('sailTo', position, (valid) => {
      if (!valid) {
        window.alert('Not a valid move! Try again.');
      }
    });
  };

  const loadCargo = (cargo: TCargo[]) => {
    console.log('Loading ' + cargo.length + ' goods from ' + currentCity?.name);

    if (!isInCity || !currentCity || !currentPlayer) {
      console.log('City or player is not defined!');
      return;
    }

    if (cargo.length < 1) {
      console.log('No cargo to load');
      return;
    }

    socketRef.current?.emit('loadCargo', cargo, (valid) => {
      if (!valid) {
        window.alert(
          'Not a valid loading condition. Your cargo hold might be full!'
        );
      }
    });
  };

  const ditchCargo = (cargo: TCargo[]) => {
    console.log('Ditching ' + cargo.length + ' goods');

    if (!currentPlayer) {
      console.log('Player is not defined!');
      return;
    }

    if (cargo.length < 1) {
      console.log('No cargo to ditch');
      return;
    }

    socketRef.current?.emit('ditchCargo', cargo, (valid) => {
      if (!valid) {
        window.alert('Failed to ditch cargo!');
      }
    });
  };

  const makeTrades = (contracts: IContract[]) => {
    console.log(
      'Trading ' + contracts.length + ' goods from ' + currentCity?.name
    );

    if (!isInCity || !currentCity || !currentPlayer) {
      console.log('City or player is not defined!');
      return;
    }

    if (contracts.length < 1) {
      console.log('No contracts to trade!');
      return;
    }

    socketRef.current?.emit('makeTrades', contracts, (valid) => {
      if (!valid) {
        window.alert('Not a valid trade. ');
      }
    });
  };

  return (
    <GameServerContext.Provider
      value={{
        session,
        game,
        createSession,
        createAndJoinNewGame,
        joinGame,
        startGame,
        endRound,
        isMyTurn,
        isMyGameToStart,
        sailTo,
        isInCity,
        currentCity,
        currentPlayer,
        loadCargo,
        ditchCargo,
        makeTrades,
      }}
    >
      {children}
    </GameServerContext.Provider>
  );
};
