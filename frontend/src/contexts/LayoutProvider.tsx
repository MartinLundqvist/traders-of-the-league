import { createContext, useContext, useEffect, useState } from 'react';
import { IPlayer } from '../../../shared/types';
import {
  getLeftForBoardPosition,
  getTopForBoardPosition,
} from '../utils/boardGeometry';
import { SHIP_DISTANCE } from '../utils/shipGeometry';
import { TActionRoute, TRoute } from '../routes';
import { createBoardLayout, TBoardLayout } from '../utils/createBoardLayout';
import { useGameServer } from './GameServerProvider';
import { useNotifications } from './NotificationsProvider';
import { canFulFillSomeContract } from '../utils/canFulfillContract';

type TShipLayout = {
  player: IPlayer;
  isMe: boolean;
  isMyTurn: boolean;
  isInCity: boolean;
  top: number;
  left: number;
}[];

interface ILayoutContext {
  boardLayout: TBoardLayout;
  shipLayout: TShipLayout;
  activeRoute: TRoute;
  activeActionRoute: TActionRoute;
  setActiveRoute: (route: TRoute) => void;
  setActiveActionRoute: (route: TActionRoute) => void;
}

const initialLayoutContext: ILayoutContext = {
  boardLayout: [],
  shipLayout: [],
  activeRoute: 'register',
  setActiveRoute: () => {},
  activeActionRoute: 'none',
  setActiveActionRoute: () => {},
};

const LayoutContext = createContext<ILayoutContext>(initialLayoutContext);

export const useLayout = () => useContext(LayoutContext);

interface ILayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({
  children,
}: ILayoutProviderProps): JSX.Element => {
  const {
    session,
    me,
    game,
    canAchieve,
    isMyTurn,
    isInCity,
    isEndGame,
    myPlayer,
    canSail,
    canLoad,
    currentCity,
    gameStatus,
    currentRound,
    endRound,
  } = useGameServer();
  const [shipLayout, setShipLayout] = useState<TShipLayout>(
    initialLayoutContext.shipLayout
  );
  const [boardLayout, setBoardLayout] = useState<TBoardLayout>(
    initialLayoutContext.boardLayout
  );
  const [activeRoute, setActiveRoute] = useState<TRoute>(
    initialLayoutContext.activeRoute
  );
  const [activeActionRoute, setActiveActionRoute] = useState<TActionRoute>(
    initialLayoutContext.activeActionRoute
  );

  const { createNotification } = useNotifications();

  useEffect(() => {
    if (game && myPlayer)
      setBoardLayout(
        createBoardLayout(game.board, canSail, currentRound.hexesWithinRange)
      );
  }, [game, myPlayer, canSail]);

  // This hook manages the UI states programmatically based on the status of the GameServer session
  useEffect(() => {
    // If there is an active game running, we check what the status is and route accordingly
    if (game) {
      // ActiveRoutes
      game.state.status === 'playing' && setActiveRoute('board');
      game.state.status === 'waiting' && setActiveRoute('board');
      game.state.status === 'won' && setActiveRoute('won');
      game.state.status === 'terminated' && setActiveRoute('terminated');
      game.state.status === 'endgame' && setActiveRoute('board');
    } else {
      // If there is no active game running, we start from the top.

      if (session.user.connected) {
        // If user is connected, but there is no sessionUuid, we ask the user to register
        !session.uuid && setActiveRoute('register');

        // If user is connected AND we have a sessionUuid, then we ask the user to pick a game
        session.uuid && setActiveRoute('start');
      }
    }
  }, [session, game]);

  // This hook manages the active action routes
  useEffect(() => {
    // Only do these things if the game is active
    if (gameStatus === 'playing' || gameStatus === 'endgame') {
      // If I have achievements to pick, just send me to that screen.
      if (canAchieve) {
        setActiveActionRoute('achieve');
      } else {
        // If I am in a city, and I only have one move left, check if I should be sent to the city actions screen.
        if (isMyTurn && isInCity && currentRound.movesLeft < 2) {
          // We only go into the city screen if there are contracts to trade OR the player can load.
          if (canLoad || canFulFillSomeContract(myPlayer, currentCity))
            // I am asserting currentCity since the isInCity is true. But this is a bit shakey.
            setActiveActionRoute('city');
        }

        // If I do NOT have achievements to pick, and the game is still playing, but it is my turn, and I am at sea with no more sailing to do - it is time to end the round...
        if (isMyTurn && !isInCity && !canSail) endRound({ confirm: false });
      }
    }
  }, [
    isMyTurn,
    isInCity,
    canSail,
    canAchieve,
    gameStatus,
    currentRound.movesLeft,
    myPlayer,
    currentCity,
  ]);

  // This hook manages the board and ship layouts programmatically based on the status of the GameServer game
  useEffect(() => {
    const getShipLayout = (): TShipLayout => {
      let shipLayout: TShipLayout = [];

      game &&
        game.players.forEach((player) => {
          const currentHex = game.board.find((hex) => {
            return (
              hex.row === player.position.row &&
              hex.column === player.position.column
            );
          });

          const numberOfShipsInSamePosition = shipLayout.filter(
            (ship) =>
              ship.player.position.column === player.position.column &&
              ship.player.position.row === player.position.row
          ).length;

          shipLayout.push({
            player,
            top: getTopForBoardPosition(player.position),
            left:
              getLeftForBoardPosition(player.position) +
              numberOfShipsInSamePosition * SHIP_DISTANCE,
            isMe: player.user.uuid === me.uuid,
            isMyTurn: game.state.currentRound.playerUuid === me.uuid,
            isInCity: !!currentHex?.city,
          });
        });

      return shipLayout;
    };

    game && setShipLayout(getShipLayout());
  }, [game]);

  // These hooks fire off notifications based on the game state
  useEffect(() => {
    isMyTurn && createNotification('Your turn');
  }, [isMyTurn]);

  useEffect(() => {
    canAchieve && createNotification('You have achievements');
  }, [canAchieve]);

  useEffect(() => {
    isEndGame && createNotification('End game');
  }, [isEndGame]);

  return (
    <LayoutContext.Provider
      value={{
        shipLayout,
        boardLayout,
        activeRoute,
        setActiveRoute,
        activeActionRoute,
        setActiveActionRoute,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
