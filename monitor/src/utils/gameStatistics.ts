import { IAchievement, IGame } from '../../../shared/types';
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

interface IAchievementStatsMaPEntry {
  uuid: string;
  name: string;
  nrFeatured: number;
  nrPicked: number;
}

export const achievementsCount = (
  games: IGame[]
): IAchievementStatsMaPEntry[] => {
  const _map = new Map<string, IAchievementStatsMaPEntry>();

  // Get the games that have been won
  const wonGames = games.filter((game) => game.state.status === 'won');

  // Iterate over all games
  wonGames.forEach((game) => {
    // Add all the achievements that are still on the board
    game.achievements.forEach((achievement) => {
      const key = achievement.uuid ?? achievement.name;

      const currentValue = _map.get(key);
      if (currentValue) {
        _map.set(key, {
          uuid: key,
          name: achievement.name,
          nrFeatured: currentValue.nrFeatured + 1,
          nrPicked: currentValue.nrPicked,
        });
      } else {
        _map.set(key, {
          uuid: key,
          name: achievement.name,
          nrFeatured: 1,
          nrPicked: 0,
        });
      }
    });

    // Iterate over all players and get the ones which have been picked
    game.players.forEach((player) => {
      // Iterate over all achievements
      player.achievements.forEach((achievement) => {
        const key = achievement.uuid ?? achievement.name;
        const currentValue = _map.get(key);
        if (currentValue) {
          _map.set(key, {
            uuid: key,
            name: achievement.name,
            nrFeatured: currentValue.nrFeatured + 1,
            nrPicked: currentValue.nrPicked + 1,
          });
        } else {
          _map.set(key, {
            uuid: key,
            name: achievement.name,
            nrFeatured: 1,
            nrPicked: 1,
          });
        }
      });
    });
  });

  const results: IAchievementStatsMaPEntry[] = [];
  _map.forEach((value, key) => {
    results.push({
      uuid: value.uuid,
      name: value.name,
      nrFeatured: value.nrFeatured,
      nrPicked: value.nrPicked,
    });
  });

  console.log(results);

  return results;
};
