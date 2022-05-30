import { useAuth0 } from '@auth0/auth0-react';
import { response } from 'express';
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
  IAchievement,
  IActiveGame,
  IBoardPosition,
  IBugReport,
  IChat,
  ICity,
  IContract,
  IGame,
  IGameResults,
  IMessage,
  IPlayer,
  ISession,
  IUser,
  ServerToClientEvents,
  TCargo,
  TGameStatus,
  TSocketConnection,
  TSocketError,
} from '../../../shared/types';
import { IBoardLayoutElement } from '../utils/createBoardLayout';
// import { useAuthDev } from '../utils/useAuthDev';
import { useNotifications } from './NotificationsProvider';

export type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

interface IGameServerContext {
  // Session specific. Only changes if new session is collected from Game Server.
  session: ISession;
  me: IUser;
  activeGameUuid: string;
  createSession: (playerName: string) => void;
  createAndJoinNewGame: (gameName: string) => void;

  // Game specific. Only changes if game state is updated.
  game: IGame | null;
  gameName: string;
  joinGame: (gameUuid: string) => void;
  leaveGame: () => void;
  yieldGame: () => void;
  startGame: () => void;
  endRound: () => void;
  myPlayer: IPlayer | null;
  isMyTurn: boolean;
  isMyGame: boolean;
  isEndGame: boolean;
  gameStatus: TGameStatus;
  gameResults: IGameResults | null;
  sailTo: (position: IBoardPosition) => void;
  isInCity: boolean;
  currentCity: ICity | null;
  currentTurnPlayer: IPlayer | null;
  loadCargo: (cargo: TCargo[]) => void;
  ditchCargo: (cargo: TCargo[]) => void;
  makeTrades: (contracts: IContract[]) => void;
  canLoad: boolean;
  canTrade: boolean;
  canSail: boolean;
  canAchieve: boolean;
  achievements: IAchievement[];
  availableAchievements: IAchievement[];
  pickAchievement: (achievement: IAchievement) => void;
  endGame: () => void;
  chat: IChat;
  sendMessage: (message: IMessage) => void;
  sendBugReport: (bugReport: IBugReport) => void;
  startTime: number;
  getActiveGames: () => Promise<IActiveGame[]>;
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
    email: '',
  },
  myPlayer: null,
  me: {
    name: '',
    uuid: '',
    connected: false,
  },
  activeGameUuid: '',
  game: null,
  gameName: '',
  createSession: () => {},
  createAndJoinNewGame: () => {},
  joinGame: () => {},
  leaveGame: () => {},
  yieldGame: () => {},
  startGame: () => {},
  endRound: () => {},
  isMyTurn: false,
  isMyGame: false,
  isEndGame: false,
  gameStatus: 'waiting',
  gameResults: null,
  sailTo: () => {},
  isInCity: false,
  currentCity: null,
  currentTurnPlayer: null,
  loadCargo: () => {},
  ditchCargo: () => {},
  makeTrades: () => {},
  canLoad: false,
  canTrade: false,
  canSail: false,
  canAchieve: false,
  availableAchievements: [],
  achievements: [],
  pickAchievement: () => {},
  endGame: () => {},
  chat: {
    gameUuid: '',
    messages: [],
  },
  sendMessage: () => {},
  sendBugReport: () => {},
  startTime: 0,
  getActiveGames: () => new Promise((res, rej) => {}),
};

const GameServerContext = createContext<IGameServerContext>(initialContext);

export const useGameServer = () => useContext(GameServerContext);

interface IGameServerProviderProps {
  children: React.ReactNode;
}

export const GameServerProvider = ({ children }: IGameServerProviderProps) => {
  const { isAuthenticated, user } = useAuth0();
  // const { isAuthenticated, user } = useAuthDev();
  const { createNotification } = useNotifications();
  const [session, setSession] = useState<ISession>(initialContext.session);
  const [me, setMe] = useState<IUser>(initialContext.me);
  const [activeGameUuid, setActiveGameUuid] = useState(
    initialContext.activeGameUuid
  );

  const [game, setGame] = useState<IGame | null>(initialContext.game);
  const [gameName, setGameName] = useState<string>(initialContext.gameName);
  const [isMyTurn, setIsMyTurn] = useState(initialContext.isMyTurn);
  const [isMyGame, setIsMyGame] = useState(initialContext.isMyGame);
  const [isEndGame, setIsEndGame] = useState(initialContext.isEndGame);
  const [isInCity, setIsInCity] = useState(initialContext.isInCity);
  const [gameStatus, setGameStatus] = useState<TGameStatus>(
    initialContext.gameStatus
  );
  const [gameResults, setGameResults] = useState<IGameResults | null>(
    initialContext.gameResults
  );

  const [myPlayer, setMyPlayer] = useState(initialContext.myPlayer);
  const [currentCity, setCurrentCity] = useState(initialContext.currentCity);
  const [currentTurnPlayer, setCurrentTurnPlayer] = useState(
    initialContext.currentTurnPlayer
  );
  const [canLoad, setCanLoad] = useState(initialContext.canLoad);
  const [canSail, setCanSail] = useState(initialContext.canSail);
  const [canTrade, setCanTrade] = useState(initialContext.canTrade);
  const [canAchieve, setCanAchieve] = useState(initialContext.canAchieve);
  const [achievements, setAchievements] = useState(initialContext.achievements);
  const [availableAchievements, setAvailableAchievements] = useState(
    initialContext.availableAchievements
  );
  const [chat, setChat] = useState<IChat>(initialContext.chat);
  const [startTime, setStartTime] = useState(initialContext.startTime);
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

  const onPushActiveChatListener = useCallback((chat: IChat) => {
    console.log('Updated chat object received');
    setChat(chat);
  }, []);

  const onPushSessionListener = useCallback((session: ISession) => {
    console.log('Updated session received');
    setSession(session);
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
    socketRef.current?.on('pushActiveChat', onPushActiveChatListener);
    socketRef.current?.on('pushSession', onPushSessionListener);

    // Clean up all listeners
    return () => {
      socketRef.current?.offAny(onAnyListener);
      socketRef.current?.off('error', onErrorListener);
      socketRef.current?.off('pushConnection', onPushConnectionListener);
      socketRef.current?.off('pushActiveGame', onPushActiveGameListener);
      socketRef.current?.off('pushActiveChat', onPushActiveChatListener);
      socketRef.current?.off('pushSession', onPushSessionListener);
      socketRef.current?.close();
    };
  }, []);

  // This hook manages the authentication status so that a valid session can be fetched
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);

      user &&
        user.email &&
        socketRef.current?.emit('fetchSession', user.email, (session) => {
          if (!session) {
            console.log(
              'No session found on game server, for user with email ' +
                user.email
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
  }, [isAuthenticated, user]);

  // This hook modifies game specific booleans for rendering purposes
  // TODO: Perhaps this should be refactored to the useLayout context?
  useEffect(() => {
    // DEBUG!
    console.log('New game: ');
    console.log(game);

    let _isMyTurn = false;
    let _isMyGame = false;
    let _isEndGame = false;
    let _gameName = '';
    let _isInCity = false;
    let _gameStatus: TGameStatus = 'waiting';
    let _currentCity: ICity | null = null;
    let _currentTurnPlayer: IPlayer | null = null;
    let _myPlayer: IPlayer | null = null;
    let _canSail = false;
    let _canTrade = false;
    let _canLoad = false;
    let _canAchieve = false;
    let _availableAchievements: IAchievement[] = [];
    let _achievements: IAchievement[] = [];
    let _startTime = 0;

    // If there is no gameUuid active, we make sure to nullify the game object
    !activeGameUuid && setGame(null);

    if (game) {
      _gameStatus = game.state.status;
      _gameName = game.name;
      _achievements = game.achievements;
      _startTime = game.startTime;

      _isMyTurn = me.uuid === game.state.currentRound.playerUuid;
      _isEndGame = game.state.status === 'endgame';

      _currentTurnPlayer =
        game.players.find(
          (player) => player.user.uuid === game.state.currentRound.playerUuid
        ) || null;
      _myPlayer =
        game.players.find((player) => player.user.uuid === me.uuid) || null;

      _isMyGame = me.uuid === game.players[0].user.uuid;

      const currentPosition = game.players.find(
        (player) => player.user.uuid === me.uuid
      )?.position;

      if (currentPosition) {
        const currentHex = game.board.find((hex) => {
          return (
            hex.row === currentPosition.row &&
            hex.column === currentPosition?.column
          );
        });

        if (currentHex && currentHex.city) {
          _isInCity = true;
          _currentCity = currentHex.city;
        }
      }

      if (_isMyTurn) {
        _availableAchievements = game.state.currentRound.achievementsEarned;

        _canAchieve =
          game.state.currentRound.movesAvailable.includes('achieve');

        _canSail = game.state.currentRound.movesAvailable.includes('sail');

        _canTrade =
          _isInCity && game.state.currentRound.movesAvailable.includes('trade');

        _canLoad =
          _isInCity && game.state.currentRound.movesAvailable.includes('load');
      }
    }

    setIsMyGame(_isMyGame);
    setGameName(_gameName);
    setIsMyTurn(_isMyTurn);
    setIsEndGame(_isEndGame);
    setGameStatus(_gameStatus);
    setIsInCity(_isInCity);
    setCurrentCity(_currentCity);
    setCurrentTurnPlayer(_currentTurnPlayer);
    setMyPlayer(_myPlayer);
    setCanSail(_canSail);
    setCanTrade(_canTrade);
    setCanLoad(_canLoad);
    setCanAchieve(_canAchieve);
    setAvailableAchievements(_availableAchievements);
    setAchievements(_achievements);
    setStartTime(_startTime);
  }, [game]);

  // Special hook for fetching gameresults if the game state is won
  useEffect(() => {
    const fetchGameResults = async () => {
      const URL = import.meta.env.VITE_URL;

      if (!activeGameUuid) {
        console.log('No game Uuid in this session');
        return;
      }

      try {
        const raw = await fetch(`${URL}/gameResults/${activeGameUuid}`);

        if (raw.ok) {
          const results = await raw.json();
          setGameResults(results.results);
        } else {
          throw Error('No game results found on server');
        }
      } catch (e) {
        console.log('Failed to fetch game results');
        console.log(e);
      }
    };

    if (gameStatus === 'won') {
      console.log('Fetching game results');
      fetchGameResults();
    }
  }, [gameStatus]);

  // This hook modifies session specific booleans for rendering purposes
  useEffect(() => {
    setMe(session.user);
    setActiveGameUuid(session.activeGameUuid);
    // If the game has been reset, remove the game object, as well as the ongoing chat.
    if (!session.activeGameUuid) {
      setGame(null);
    }
  }, [session]);

  const createSession = (playerName: string) => {
    if (playerName.length < 3) {
      window.alert('Name needs to be at least 2 characters long.');
      return;
    }
    console.log('Creating a new session for user ' + playerName);
    user &&
      user.email &&
      socketRef.current?.emit(
        'createSession',
        playerName,
        user.email,
        (session) => {
          // Update the local storage
          // window.localStorage.setItem('sessionUuid', session.uuid);

          // Update application state
          setSession(session);

          console.log('New session received');
        }
      );
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

  const leaveGame = () => {
    console.log('Leaving game with Uuid ' + session.activeGameUuid);
    socketRef.current?.emit('leaveGame');
  };

  const yieldGame = () => {
    if (!game) return;

    if (window.confirm('Are you sure you want to abandon?')) {
      console.log('Leaving game with Uuid ' + session.activeGameUuid);
      socketRef.current?.emit('yieldGame');
    }
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

  const sailTo = (hex: IBoardLayoutElement) => {
    console.log('Sailing to ' + JSON.stringify(hex));

    if (!canSail) {
      window.alert(
        'You cannot sail. Not your turn or you have already sailed once on your move.'
      );
      return;
    }

    // Safeguard, in case the user really didn't intend to sail into the open sea...
    if (!hex.city) {
      if (
        !window.confirm(
          'Are you sure you want to sail there? Your destination has no city.'
        )
      )
        return;
    }

    socketRef.current?.emit(
      'sailTo',
      { column: hex.column, row: hex.row },
      (valid) => {
        if (!valid) {
          window.alert('Not a valid move! Try again.');
        }
      }
    );
  };

  const loadCargo = (cargo: TCargo[]) => {
    console.log('Loading ' + cargo.length + ' goods from ' + currentCity?.name);

    if (!isInCity || !currentCity || !me) {
      console.log('City or player is not defined!');
      return;
    }

    if (!canLoad) {
      window.alert(
        'You cannot load. Not your turn or you have already loaded once on your move.'
      );
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

    if (!me) {
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

    if (!isInCity || !currentCity || !me) {
      console.log('City or player is not defined!');
      return;
    }

    if (!canTrade) {
      window.alert(
        'You cannot trade. Not your turn or you have already traded once on your move.'
      );
      return;
    }

    if (contracts.length < 1) {
      console.log('No contracts to trade!');
      return;
    }

    socketRef.current?.emit('makeTrades', contracts, (valid) => {
      if (!valid) {
        window.alert('Not a valid trade. ');
        return;
      }

      // Check if player emptied the city
      if (contracts.length === currentCity.contracts.length) {
        createNotification('City emptied');
      }
    });
  };

  const pickAchievement = (achievement: IAchievement) => {
    console.log('Picking ' + JSON.stringify(achievement));

    if (!canAchieve || availableAchievements.length < 1) {
      console.log('Not eligble to achieve');
      return;
    }

    socketRef.current?.emit('pickAchievement', achievement, (valid) => {
      if (!valid) {
        window.alert('Not a valid achievement ');
      }
    });
  };

  const endGame = () => {
    console.log('Ending the game');

    if (!game || !isMyGame) {
      window.alert('No game running that you can end.');
      return;
    }

    socketRef.current?.emit('endGame');
  };

  const sendMessage = (message: IMessage) => {
    console.log('Sending message ' + message.message);

    socketRef.current?.emit('sendMessage', message);
  };

  const sendBugReport = async (bugReport: IBugReport) => {
    if (!bugReport) {
      return;
    }

    console.log('Sending bugreport ' + bugReport);

    try {
      const URL = import.meta.env.VITE_URL || '';

      const response = await fetch(`${URL}/postbugreport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bugReport),
      });

      if (!response.ok) {
        window.alert('Error sending bugreport');
        return;
      }

      window.alert('Successfully sent bugreport');
    } catch (err) {
      console.log('Error sending bugreport');
      console.log(err);
      window.alert('Error sending bugreport');
    }
  };

  const getActiveGames = async (): Promise<IActiveGame[]> => {
    console.log('Fetching active games from server');

    try {
      const URL = import.meta.env.VITE_URL || '';

      const response = await fetch(`${URL}/activegames`);

      if (!response.ok) {
        window.alert('Error fetching active games');
        return [];
      }

      const results = await response.json();

      return results;
    } catch (e) {
      window.alert('Error fetching active games');
      console.log(e);
      return [];
    }
  };

  return (
    <GameServerContext.Provider
      value={{
        session,
        game,
        gameName,
        me,
        activeGameUuid,
        createSession,
        createAndJoinNewGame,
        joinGame,
        leaveGame,
        yieldGame,
        startGame,
        endRound,
        isMyTurn,
        isMyGame,
        isEndGame,
        gameStatus,
        gameResults,
        sailTo,
        isInCity,
        currentCity,
        currentTurnPlayer,
        myPlayer,
        loadCargo,
        ditchCargo,
        makeTrades,
        canTrade,
        canSail,
        canLoad,
        canAchieve,
        achievements,
        availableAchievements,
        pickAchievement,
        endGame,
        chat,
        sendMessage,
        sendBugReport,
        startTime,
        getActiveGames,
      }}
    >
      {children}
    </GameServerContext.Provider>
  );
};
