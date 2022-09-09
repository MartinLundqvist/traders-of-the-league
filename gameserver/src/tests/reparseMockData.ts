import { IContract, IGame, TCargo } from '../../../shared/types';
import { MOCK_GAME } from '../game-engine/mockData';

const createUuid = (contract: IContract): string => {
  const parseColor = (cargo: TCargo): string => {
    switch (cargo) {
      case 'black':
        return 'bla';
        break;
      case 'blue':
        return 'blu';
        break;
      case 'brown':
        return 'bro';
        break;
      case 'gray':
        return 'gry';
        break;
      case 'green':
        return 'grn';
        break;
      case 'red':
        return 'red';
        break;
      case 'yellow':
        return 'yel';
        break;
    }
  };

  const newUuid =
    contract.region[0] +
    '_' +
    parseColor(contract.cargo[0]) +
    '_' +
    parseColor(contract.cargo[1]) +
    '_' +
    contract.value.toString();

  return newUuid;
};

const reparse = (game: IGame) => {
  // Go through all contracts on the board and for each player, and change the UUID accordingly
  game.board.forEach((hex) => {
    if (hex.city) {
      hex.city.contracts.forEach((contract) => {
        contract.uuid = createUuid(contract);
      });
    }
  });

  game.players.forEach((player) => {
    player.contractsFulfilled.forEach((contract) => {
      contract.uuid = createUuid(contract);
    });
  });
};

reparse(MOCK_GAME);

console.log(JSON.stringify(MOCK_GAME));
