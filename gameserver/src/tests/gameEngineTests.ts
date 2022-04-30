import { findAchievementsEarned } from '../game-engine/findAchievementsEarned';
import * as Tests from '../game-engine/achievementTests';
import { MOCK_GAME } from '../game-engine/mockData';

const testAchievements = () => {
  const mockPlayer = MOCK_GAME.players[0];

  console.time('Test achievements');

  const diversifierA = Tests.hasEarnedDiversifierA(mockPlayer);
  const diversifierB = Tests.hasEarnedDiversifierB(mockPlayer);
  const regionalTraderA = Tests.hasEarnedRegionalTraderA(mockPlayer);
  const regionalTraderB = Tests.hasEarnedRegionalTraderB(mockPlayer);
  const monopolistA = Tests.hasEarnedMonopolistA(mockPlayer);
  const monopolistB = Tests.hasEarnedMonopolistB(mockPlayer);
  const explorerA = Tests.hasEarnedExplorerA(mockPlayer);
  const explorerB = Tests.hasEarnedExplorerB(mockPlayer);
  const supplierA = Tests.hasEarnedSupplierA(mockPlayer);
  const supplierB = Tests.hasEarnedSupplierB(mockPlayer);
  const specialistA = Tests.hasEarnedSpecialistA(mockPlayer);
  const specialistB = Tests.hasEarnedSpecialistB(mockPlayer);
  const merchantA = Tests.hasEarnedMerchantA(mockPlayer);
  const merchantB = Tests.hasEarnedMerchantB(mockPlayer);
  const bankerA = Tests.hasEarnedBankerA(mockPlayer);
  const bankerB = Tests.hasEarnedBankerB(mockPlayer);

  console.timeEnd('Test achievements');

  console.log('DiversifierA? ' + diversifierA);
  console.log('DiversifierB? ' + diversifierB);
  console.log('RegionalTraderA? ' + regionalTraderA);
  console.log('RegionalTraderB? ' + regionalTraderB);
  console.log('MonopolistA? ' + monopolistA);
  console.log('MonopolistB? ' + monopolistB);
  console.log('ExplorerA? ' + explorerA);
  console.log('ExplorerB? ' + explorerB);
  console.log('SupplierA? ' + supplierA);
  console.log('SupplierB? ' + supplierB);
  console.log('SpecialistA? ' + specialistA);
  console.log('SpecialistB? ' + specialistB);
  console.log('MerchantA? ' + merchantA);
  console.log('MerchantB? ' + merchantB);
  console.log('BankerA ' + bankerA);
  console.log('BankerB ' + bankerB);

  console.time('Find achievements');

  const earnedAchievements = findAchievementsEarned(
    MOCK_GAME.players[0],
    MOCK_GAME
  );

  console.timeEnd('Find achievements');

  console.log(earnedAchievements);
};

testAchievements();
