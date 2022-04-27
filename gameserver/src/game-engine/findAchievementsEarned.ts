import { IAchievement, IGame, IPlayer } from '../../../shared/types';

export const findAchievementsEarned = (
  currentPlayer: IPlayer,
  game: IGame
): IAchievement[] => {
  const newAchievement: IAchievement = {
    name: 'Test',
    value: 3,
  };

  return [newAchievement];
};
