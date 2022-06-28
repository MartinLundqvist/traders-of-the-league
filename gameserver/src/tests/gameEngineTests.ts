import { updateAchievementsProgressAndReturnEarnedAchievements } from '../game-engine/findAchievementsEarned';
// import * as Tests from '../game-engine/achievementTests';
import * as Progressions from '../game-engine/achievementProgressions';
import { MOCK_GAME } from '../game-engine/mockData';
import { pickRandomAchievements } from '../game-engine/pickRandomAchievements';

// const testAchievements = (player: number) => {
//   const mockPlayer = MOCK_GAME.players[player];

//   console.time('Test achievements');

//   const diversifierA = Tests.hasEarnedDiversifierA(mockPlayer);
//   const diversifierB = Tests.hasEarnedDiversifierB(mockPlayer);
//   const regionalTraderA = Tests.hasEarnedRegionalTraderA(mockPlayer);
//   const regionalTraderB = Tests.hasEarnedRegionalTraderB(mockPlayer);
//   const monopolistA = Tests.hasEarnedMonopolistA(mockPlayer);
//   const monopolistB = Tests.hasEarnedMonopolistB(mockPlayer);
//   const explorerA = Tests.hasEarnedExplorerA(mockPlayer);
//   const explorerB = Tests.hasEarnedExplorerB(mockPlayer);
//   const supplierA = Tests.hasEarnedSupplierA(mockPlayer);
//   const supplierB = Tests.hasEarnedSupplierB(mockPlayer);
//   const specialistA = Tests.hasEarnedSpecialistA(mockPlayer);
//   const specialistB = Tests.hasEarnedSpecialistB(mockPlayer);
//   const merchantA = Tests.hasEarnedMerchantA(mockPlayer);
//   const merchantB = Tests.hasEarnedMerchantB(mockPlayer);
//   const bankerA = Tests.hasEarnedBankerA(mockPlayer);
//   const bankerB = Tests.hasEarnedBankerB(mockPlayer);

//   console.timeEnd('Test achievements');

//   console.log('DiversifierA? ' + diversifierA);
//   console.log('DiversifierB? ' + diversifierB);
//   console.log('RegionalTraderA? ' + regionalTraderA);
//   console.log('RegionalTraderB? ' + regionalTraderB);
//   console.log('MonopolistA? ' + monopolistA);
//   console.log('MonopolistB? ' + monopolistB);
//   console.log('ExplorerA? ' + explorerA);
//   console.log('ExplorerB? ' + explorerB);
//   console.log('SupplierA? ' + supplierA);
//   console.log('SupplierB? ' + supplierB);
//   console.log('SpecialistA? ' + specialistA);
//   console.log('SpecialistB? ' + specialistB);
//   console.log('MerchantA? ' + merchantA);
//   console.log('MerchantB? ' + merchantB);
//   console.log('BankerA ' + bankerA);
//   console.log('BankerB ' + bankerB);

//   console.time('Find achievements');

//   const earnedAchievements = findAchievementsEarned(
//     MOCK_GAME.players[player],
//     MOCK_GAME
//   );

//   console.timeEnd('Find achievements');

//   console.log(earnedAchievements);
// };

const testProgressionAchievements = (player: number) => {
  const mockPlayer = MOCK_GAME.players[player];

  console.time('Test achievements');

  const diversifierA = Progressions.progressionDiversifierA(mockPlayer);
  const diversifierB = Progressions.progressionDiversifierB(mockPlayer);
  const regionalTraderA = Progressions.progressionRegionalTraderA(mockPlayer);
  const regionalTraderB = Progressions.progressionRegionalTraderB(mockPlayer);
  const monopolistA = Progressions.progressionMonopolistA(mockPlayer);
  const monopolistB = Progressions.progressionMonopolistB(mockPlayer);
  const explorerA = Progressions.progressionExplorerA(mockPlayer);
  const explorerB = Progressions.progressionExplorerB(mockPlayer);
  const supplierA = Progressions.progressionSupplierA(mockPlayer);
  const supplierB = Progressions.progressionSupplierB(mockPlayer);
  const specialistA = Progressions.progressionSpecialistA(mockPlayer);
  const specialistB = Progressions.progressionSpecialistB(mockPlayer);
  const merchantA = Progressions.progressionMerchantA(mockPlayer);
  const merchantB = Progressions.progressionMerchantB(mockPlayer);
  const bankerA = Progressions.progressionBankerA(mockPlayer);
  const bankerB = Progressions.progressionBankerB(mockPlayer);

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

  const earnedAchievements =
    updateAchievementsProgressAndReturnEarnedAchievements(
      MOCK_GAME.players[player],
      MOCK_GAME
    );

  console.timeEnd('Find achievements');

  console.log(earnedAchievements);
};

const testPickAchievements = () => {
  console.log(pickRandomAchievements(3));
  console.log(pickRandomAchievements(4));
  console.log(pickRandomAchievements(5));
};

// testAchievements(1);
testProgressionAchievements(1);
// testPickAchievements();
