import {
  IAchievement,
  IGame,
  IPlayer,
  TAchievement,
} from '../../../shared/types';
import * as Tests from './achievementTests';

type TAchievementTest = {
  [key in TAchievement]: (player: IPlayer) => boolean;
};

const achievementTests: TAchievementTest = {
  'Diversifier A': (player: IPlayer) => Tests.hasEarnedDiversifierA(player),
  'Diversifier B': (player: IPlayer) => Tests.hasEarnedDiversifierB(player),
  'Regional Trader A': (player: IPlayer) =>
    Tests.hasEarnedRegionalTraderA(player),
  'Regional Trader B': (player: IPlayer) =>
    Tests.hasEarnedRegionalTraderB(player),
  'Monopolist A': (player: IPlayer) => Tests.hasEarnedMonopolistA(player),
  'Monopolist B': (player: IPlayer) => Tests.hasEarnedMonopolistB(player),
  'Explorer A': (player: IPlayer) => Tests.hasEarnedExplorerA(player),
  'Explorer B': (player: IPlayer) => Tests.hasEarnedExplorerB(player),
  'Supplier A': (player: IPlayer) => Tests.hasEarnedSupplierA(player),
  'Supplier B': (player: IPlayer) => Tests.hasEarnedSupplierB(player),
  'Specialist A': (player: IPlayer) => Tests.hasEarnedSpecialistA(player),
  'Specialist B': (player: IPlayer) => Tests.hasEarnedSpecialistB(player),
  'Merchant A': (player: IPlayer) => Tests.hasEarnedMerchantA(player),
  'Merchant B': (player: IPlayer) => Tests.hasEarnedMerchantB(player),
  'Banker A': (player: IPlayer) => Tests.hasEarnedBankerA(player),
  'Banker B': (player: IPlayer) => Tests.hasEarnedBankerB(player),
};

export const findAchievementsEarned = (
  currentPlayer: IPlayer,
  game: IGame
): IAchievement[] => {
  let newAchievements: IAchievement[] = [];

  game.achievements.forEach((achievement) => {
    if (achievementTests[achievement.name](currentPlayer)) {
      newAchievements.push(achievement);
    }
  });

  return newAchievements;
};
