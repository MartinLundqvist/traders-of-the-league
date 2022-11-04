import { ACHIEVEMENTS } from './constants';
import { IAchievement, IGame, IPlayer } from '../../../shared/types';

export const updateAchievementsProgressAndReturnEarnedAchievements = (
  currentPlayer: IPlayer,
  game: IGame
): IAchievement[] => {
  const newAchievements: IAchievement[] = [];

  // Update the progress count for each achievement. If the achievement is fulfilled - add it to the results array.
  game.achievements.forEach((achievement) => {
    const innerAchievement = ACHIEVEMENTS.find(
      (_achievement) => _achievement.uuid === achievement.uuid
    );

    if (!innerAchievement) {
      console.log(
        'Error while looking for inner achievement: ' + achievement.uuid
      );
      return;
    }

    const { progressionFn, progressionArg, targetFn } = innerAchievement;
    const progress = targetFn(progressionFn(currentPlayer, progressionArg));

    const playerAchievementProgress = currentPlayer.achievementsProgress.find(
      (achievementProgress) => achievementProgress.uuid === achievement.uuid
    );
    playerAchievementProgress &&
      (playerAchievementProgress.progress = progress);

    if (progress >= achievement.target) {
      newAchievements.push(achievement);
    }
  });

  return newAchievements;
};
