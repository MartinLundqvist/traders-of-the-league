import { numberOfCitiesToEmpty } from '../constants';
import { IGame, TWinCondition } from '../../../../shared/types';

export const parseWinCondition = (winCondition: TWinCondition): number => {
  switch (winCondition) {
    case 'Auto':
      return 5;
    case '10':
      return 10;
    case 'All':
      return 15;
    default:
      return 5;
  }
};

export const getNumberOfCitiesToEmpty = (game: IGame): number => {
  if (game.numberOfCitiesToEmpty === 5) {
    return numberOfCitiesToEmpty[game.players.length];
  }

  if (game.numberOfCitiesToEmpty === 10) {
    return 10;
  }

  if (game.numberOfCitiesToEmpty === 15) {
    const nrCities = game.board.reduce(
      (acc, hex) => (hex.city ? acc + 1 : acc),
      0
    );

    return nrCities;
  }

  return game.numberOfCitiesToEmpty;
};
