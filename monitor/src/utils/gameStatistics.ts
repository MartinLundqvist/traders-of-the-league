import { IGame } from '../../../shared/types';
import { createContractUuid } from './createContractUuid';

interface ICityEmptied {
  cityName: string;
  nrEmpties: number;
}

export const citiesEmptied = (games: IGame[]): ICityEmptied[] => {
  const _map = new Map<string, number>();

  // Get the first game and initialize the map
  games[0].board.forEach((hex) => {
    if (hex.city) {
      _map.set(hex.city.name, 0);
    }
  });

  // Get the games that have been won
  //   const wonGames = games;
  const wonGames = games.filter((game) => game.state.status === 'won');

  // Iterate over all games
  wonGames.forEach((game) => {
    // Iterate over all players
    game.players.forEach((player) => {
      // Iterate over all emptied cities
      player.citiesEmptied.forEach((city) => {
        const newValue = _map.get(city.name)! + 1; // This is OK - we have initiated it
        _map.set(city.name, newValue);
      });
    });
  });

  const results: ICityEmptied[] = [];
  _map.forEach((value, key) => {
    results.push({ cityName: key, nrEmpties: value });
  });

  results.sort((a, b) => b.nrEmpties - a.nrEmpties);

  return results;
};

interface IContractFulfilled {
  uuid: string;
  nrFulFilled: number;
  region: string;
  color_1: string;
  color_2: string;
  value: number;
}

interface IMapEntry {
  nrFulFilled: number;
  region: string;
  color_1: string;
  color_2: string;
  value: number;
}

export const contractsFulFilled = (games: IGame[]): IContractFulfilled[] => {
  const _map = new Map<string, IMapEntry>();

  // Get the games that have been won
  //   const wonGames = games;
  const wonGames = games.filter((game) => game.state.status === 'won');

  // Iterate over all games
  wonGames.forEach((game) => {
    // Iterate over all players
    game.players.forEach((player) => {
      // Iterate over all contracts fulfilled
      player.contractsFulfilled.forEach((contract) => {
        const contractUuid = createContractUuid(contract);
        const currentValue = _map.get(contractUuid);
        const newValue = currentValue ? currentValue.nrFulFilled + 1 : 1;
        _map.set(contractUuid, {
          nrFulFilled: newValue,
          region: contract.region,
          color_1: contract.cargo[0],
          color_2: contract.cargo[1],
          value: contract.value,
        });
      });
    });
  });

  const results: IContractFulfilled[] = [];
  _map.forEach((value, key) => {
    results.push({ uuid: key, ...value });
  });

  results.sort((a, b) => b.nrFulFilled - a.nrFulFilled);

  return results;
};
