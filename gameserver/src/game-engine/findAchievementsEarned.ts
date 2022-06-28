import {
  IAchievement,
  IGame,
  IPlayer,
  TAchievement,
} from '../../../shared/types';
// import * as Tests from './achievementTests';
import * as Progressions from './achievementProgressions';
import { ACHIEVEMENTS_TARGETS } from './constants';

// type TAchievementTest = {
//   [key in TAchievement]: (player: IPlayer) => boolean;
// };
type TAchievementProgress = {
  [key in TAchievement]: (player: IPlayer) => number;
};

// const achievementTests: TAchievementTest = {
//   'Diversifier A': (player: IPlayer) => Tests.hasEarnedDiversifierA(player),
//   'Diversifier B': (player: IPlayer) => Tests.hasEarnedDiversifierB(player),
//   'Regional Trader A': (player: IPlayer) =>
//     Tests.hasEarnedRegionalTraderA(player),
//   'Regional Trader B': (player: IPlayer) =>
//     Tests.hasEarnedRegionalTraderB(player),
//   'Monopolist A': (player: IPlayer) => Tests.hasEarnedMonopolistA(player),
//   'Monopolist B': (player: IPlayer) => Tests.hasEarnedMonopolistB(player),
//   'Explorer A': (player: IPlayer) => Tests.hasEarnedExplorerA(player),
//   'Explorer B': (player: IPlayer) => Tests.hasEarnedExplorerB(player),
//   'Supplier A': (player: IPlayer) => Tests.hasEarnedSupplierA(player),
//   'Supplier B': (player: IPlayer) => Tests.hasEarnedSupplierB(player),
//   'Specialist A': (player: IPlayer) => Tests.hasEarnedSpecialistA(player),
//   'Specialist B': (player: IPlayer) => Tests.hasEarnedSpecialistB(player),
//   'Merchant A': (player: IPlayer) => Tests.hasEarnedMerchantA(player),
//   'Merchant B': (player: IPlayer) => Tests.hasEarnedMerchantB(player),
//   'Banker A': (player: IPlayer) => Tests.hasEarnedBankerA(player),
//   'Banker B': (player: IPlayer) => Tests.hasEarnedBankerB(player),
// };

const achievementProgress: TAchievementProgress = {
  'Diversifier A': (player: IPlayer) =>
    Progressions.progressionDiversifierA(player),
  'Diversifier B': (player: IPlayer) =>
    Progressions.progressionDiversifierB(player),
  'Regional Trader A': (player: IPlayer) =>
    Progressions.progressionRegionalTraderA(player),
  'Regional Trader B': (player: IPlayer) =>
    Progressions.progressionRegionalTraderB(player),
  'Monopolist A': (player: IPlayer) =>
    Progressions.progressionMonopolistA(player),
  'Monopolist B': (player: IPlayer) =>
    Progressions.progressionMonopolistB(player),
  'Explorer A': (player: IPlayer) => Progressions.progressionExplorerA(player),
  'Explorer B': (player: IPlayer) => Progressions.progressionExplorerB(player),
  'Supplier A': (player: IPlayer) => Progressions.progressionSupplierA(player),
  'Supplier B': (player: IPlayer) => Progressions.progressionSupplierB(player),
  'Specialist A': (player: IPlayer) =>
    Progressions.progressionSpecialistA(player),
  'Specialist B': (player: IPlayer) =>
    Progressions.progressionSpecialistB(player),
  'Merchant A': (player: IPlayer) => Progressions.progressionMerchantA(player),
  'Merchant B': (player: IPlayer) => Progressions.progressionMerchantB(player),
  'Banker A': (player: IPlayer) => Progressions.progressionBankerA(player),
  'Banker B': (player: IPlayer) => Progressions.progressionBankerB(player),
};

// TODO: TO BE DEPRECATED
// export const findAchievementsEarned = (
//   currentPlayer: IPlayer,
//   game: IGame
// ): IAchievement[] => {
//   let newAchievements: IAchievement[] = [];

//   game.achievements.forEach((achievement) => {
//     if (achievementTests[achievement.name](currentPlayer)) {
//       newAchievements.push(achievement);
//     }
//   });

//   return newAchievements;
// };

export const updateAchievementsProgressAndReturnEarnedAchievements = (
  currentPlayer: IPlayer,
  game: IGame
): IAchievement[] => {
  let newAchievements: IAchievement[] = [];

  // Update the progress count for each achievement. If the achievement is fulfilled - add it to the results array.
  game.achievements.forEach((achievement) => {
    const progress = achievementProgress[achievement.name](currentPlayer);
    const playerAchievementProgress = currentPlayer.achievementsProgress.find(
      (achievementProgress) =>
        achievementProgress.achievementName === achievement.name
    );
    playerAchievementProgress &&
      (playerAchievementProgress.progress = progress);

    if (progress >= ACHIEVEMENTS_TARGETS[achievement.name]) {
      newAchievements.push(achievement);
    }
  });

  return newAchievements;
};
