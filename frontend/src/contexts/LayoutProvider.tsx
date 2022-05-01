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

type TShipLayout = {
  player: IPlayer;
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
  const { session, game, canAchieve } = useGameServer();
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

  useEffect(() => {
    game && setBoardLayout(createBoardLayout(game.board));
  }, [game]);

  // This hook manages the UI states programmatically based on the status of the GameServer session
  useEffect(() => {
    // If there is an active game running, we check what the status is and route accordingly
    if (game) {
      game.state.status === 'playing' && setActiveRoute('board');
      game.state.status === 'endgame' && setActiveRoute('board');
      game.state.status === 'waiting' && setActiveRoute('board');
      game.state.status === 'won' && setActiveRoute('won');
    } else {
      // If there is no active game running, we start from the top.

      if (session.user.connected) {
        // If user is connected, but there is no sessionUuid, we ask the user to register
        !session.uuid && setActiveRoute('register');

        // If user is connected AND we have a sessionUuid, then we ask the user to pick a game
        session.uuid && setActiveRoute('start');
      }
    }
  }, [session, game, canAchieve]);

  useEffect(() => {
    const getShipLayout = (): TShipLayout => {
      let shipLayout: TShipLayout = [];

      game &&
        game.players.forEach((player) => {
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
          });
        });

      return shipLayout;
    };

    game && setShipLayout(getShipLayout());
  }, [game]);

  return (
    <LayoutContext.Provider
      value={{
        // movePlayerUUIDTo,
        // players,
        shipLayout,
        boardLayout,
        // dealContracts,
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
