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

type TShipLayout = {
  player: IPlayer;
  top: number;
  left: number;
}[];

interface IGameContext {
  myPlayerUUID: string;
  players: IPlayer[];
  boardLayout: TBoardLayout;
  shipLayout: TShipLayout;
  dealContracts: () => void;
  // contracts: IContract[];
  movePlayerUUIDTo: (playerUUID: string, to: IBoardPosition) => void;
  activeRoute: TRoute;
}

const initialGameContext: IGameContext = {
  myPlayerUUID: '',
  players: [],
  movePlayerUUIDTo: () => {},
  boardLayout: [],
  shipLayout: [],
  dealContracts: () => {},
  // contracts: [],
  activeRoute: 'start',
};

const GameContext = createContext<IGameContext>(initialGameContext);

export const useGame = () => useContext(GameContext);

interface IGameProviderProps {
  children: React.ReactNode;
}

export const GameProvider = ({ children }: IGameProviderProps): JSX.Element => {
  const [myPlayerUUID, setMyPlayerUUID] = useState(
    initialGameState.players[0].uuid
  );
  const [players, setPlayers] = useState<IPlayer[]>(initialGameState.players);
  const [shipLayout, setShipLayout] = useState<TShipLayout>([]);
  const [boardLayout, setBoardLayout] = useState<TBoardLayout>([]);
  // const [contracts, setContracts] = useState<IContract[]>([]);
  const [activeRoute, setActiveRoute] = useState<TRoute>('board');

  useEffect(() => {
    // console.log('First render of the GameProvider');
    setBoardLayout(createBoardLayout());
  }, []);

  useEffect(() => {
    const getShipLayout = (): TShipLayout => {
      let shipLayout: TShipLayout = [];

      players.forEach((player) => {
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

    setShipLayout(getShipLayout());
  }, [players]);

  const movePlayerUUIDTo = (playerUUID: string, to: IBoardPosition) => {
    let targetPlayer = players.find((plr) => plr.uuid === playerUUID);
    if (!targetPlayer) return;

    if (moveIsAllowed(targetPlayer.position, to)) {
      // console.log('Is allowed.');
      targetPlayer.position = to;
    }

    let tempPlayers = players.filter((plr) => plr.uuid !== playerUUID);
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
    <GameContext.Provider
      value={{
        myPlayerUUID,
        movePlayerUUIDTo,
        players,
        shipLayout,
        boardLayout,
        dealContracts,
        activeRoute,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
