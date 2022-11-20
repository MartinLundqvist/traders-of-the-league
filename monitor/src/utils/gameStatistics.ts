import { IGame, TCity } from '../../../shared/types';

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
  contractName: string;
  nrFulFilled: number;
}

export const contractsFulFilled = (games: IGame[]): IContractFulfilled[] => {
  const _map = new Map<string, number>();

  // Get the games that have been won
  //   const wonGames = games;
  const wonGames = games.filter((game) => game.state.status === 'won');

  // Iterate over all games
  wonGames.forEach((game) => {
    // Iterate over all players
    game.players.forEach((player) => {
      // Iterate over all contracts fulfilled
      player.contractsFulfilled.forEach((contract) => {
        const currentValue = _map.get(contract.uuid);
        const newValue = currentValue ? currentValue + 1 : 1;
        _map.set(contract.uuid, newValue);
      });
    });
  });

  const results: IContractFulfilled[] = [];
  _map.forEach((value, key) => {
    results.push({ contractName: key, nrFulFilled: value });
  });

  results.sort((a, b) => b.nrFulFilled - a.nrFulFilled);

  return results;
};
