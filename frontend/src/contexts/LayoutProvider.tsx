import { createContext, useContext, useEffect, useState } from 'react';
import { initialGameState } from '../../../shared/constants';
import { IBoardPosition, IPlayer } from '../../../shared/types';
import {
  getLeftForBoardPosition,
  getTopForBoardPosition,
} from '../utils/boardGeometry';
import { SHIP_DISTANCE } from '../utils/shipGeometry';
import { moveIsAllowed } from '../../../shared/utils/moves';
import { TRoute } from '../routes';
import { createBoardLayout, TBoardLayout } from '../utils/createBoardLayout';
import { createNewContracts } from '../../../shared/utils/createNewContracts';
import { pickContractByRegion } from '../../../shared/utils/pickContractByRegion';
import { useGameServer } from './GameServerProvider';

type TShipLayout = {
  player: IPlayer;
  top: number;
  left: number;
}[];

interface ILayoutContext {
  players: IPlayer[];
  boardLayout: TBoardLayout;
  shipLayout: TShipLayout;
  dealContracts: () => void;
  // contracts: IContract[];
  movePlayerUUIDTo: (playerUUID: string, to: IBoardPosition) => void;
  activeRoute: TRoute;
  setActiveRoute: (route: TRoute) => void;
}

const initialLayoutContext: ILayoutContext = {
  players: [],
  movePlayerUUIDTo: () => {},
  boardLayout: [],
  shipLayout: [],
  dealContracts: () => {},
  // contracts: [],
  activeRoute: 'register',
  setActiveRoute: () => {},
};

const LayoutContext = createContext<ILayoutContext>(initialLayoutContext);

export const useLayout = () => useContext(LayoutContext);

interface ILayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({
  children,
}: ILayoutProviderProps): JSX.Element => {
  const { session, game } = useGameServer();
  // const [myPlayerUUID, setMyPlayerUUID] = useState(
  //   initialGameState.players[0].user.uuid
  // );
  const [players, setPlayers] = useState<IPlayer[]>(initialGameState.players);
  const [shipLayout, setShipLayout] = useState<TShipLayout>(
    initialLayoutContext.shipLayout
  );
  const [boardLayout, setBoardLayout] = useState<TBoardLayout>(
    initialLayoutContext.boardLayout
  );
  // const [contracts, setContracts] = useState<IContract[]>([]);
  const [activeRoute, setActiveRoute] = useState<TRoute>(
    initialLayoutContext.activeRoute
  );

  useEffect(() => {
    game && setBoardLayout(createBoardLayout(game.board));
  }, [game]);

  // This hook manages the UI states programmatically based on the status of the GameServer session
  useEffect(() => {
    // If user is connected, but there is no sessionUuid, we ask the user to register
    if (session.user.connected && !session.uuid) {
      setActiveRoute('register');
    }

    // If user is connected AND we have a sessionUuid, then we ask the user to pick a game
    if (session.user.connected && session.uuid) {
      setActiveRoute('start');
    }

    // If there is an active game running, we just stay there
    if (game) {
      setActiveRoute('board');
    }
  }, [session.user.connected, session.uuid, game]);

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

  const movePlayerUUIDTo = (playerUUID: string, to: IBoardPosition) => {
    let targetPlayer = players.find((plr) => plr.user.uuid === playerUUID);
    if (!targetPlayer) return;

    if (moveIsAllowed(targetPlayer.position, to)) {
      // console.log('Is allowed.');
      targetPlayer.position = to;
    }

    let tempPlayers = players.filter((plr) => plr.user.uuid !== playerUUID);
    setPlayers([...tempPlayers, targetPlayer]);
  };

  const dealContracts = () => {
    // console.log('In dealContracts');
    const newContracts = createNewContracts();
    // console.log('Created ' + newContracts.length + ' new contracts');
    const tempBoardLayout = [...boardLayout];
    tempBoardLayout.forEach((element) => {
      if (element.city) {
        let pickedContracts = [];
        pickedContracts.push(
          pickContractByRegion(newContracts, element.city.region)
        );
        pickedContracts.push(
          pickContractByRegion(newContracts, element.city.region)
        );
        pickedContracts.push(
          pickContractByRegion(newContracts, element.city.region)
        );
        element.city.contracts = pickedContracts;
      }
    });

    // console.log(boardLayout);

    setBoardLayout(tempBoardLayout);
  };

  return (
    <LayoutContext.Provider
      value={{
        movePlayerUUIDTo,
        players,
        shipLayout,
        boardLayout,
        dealContracts,
        activeRoute,
        setActiveRoute,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
