/* Progressions
- Count number of contracts worth [X, Y, Z] return [Nx, Ny, Nz]. How many [3, 5] returns [1, 1] = 2.
- Count number of contracts with color [X, Y, Z] return [Nx, Ny, Nz]. 
- Count number of contracts from region [X, Y, Z] returns [Nx, Ny, Nz]. 

*/

/* Achievement Declaration
- NrPLayers: [2,5] // Two to five players.
- Name: Banker
- Side: A
- Description: 'Four contracts worth 3 VP'
- UIName: Banker_A_2-5_4P
- Progression: CountNrContractsVP(player, [3])[0]
- Target: 4
- Value: 4

*/

/* Achievement Progression Function

for each achievement
- run the Progression function
- compare the results with the Target value
- if equal or higher - add the achievement to the Earned array on the player
- In all cases update the player achievementProgress object.

*/

import { ACHIEVEMENTS, cargoColors } from '../game-engine/constants';
import { IPlayer, TCargo, TRegion } from '../../../shared/types';
import { MOCK_GAME } from '../game-engine/mockData';
import { pickRandomAchievements } from '../game-engine/pickRandomAchievements';
import { updateAchievementsProgressAndReturnEarnedAchievements } from '../game-engine/findAchievementsEarned';

// type TProgressionValues = number | TCargo | TRegion;

// const countNrContractsVP = (
//   player: IPlayer,
//   values: TProgressionValues[]
// ): number[] => {
//   const result = new Array<number>(values.length);
//   result.fill(0);

//   player.contractsFulfilled.forEach((contract) => {
//     // Is the contract of one of the values we are looking for?
//     let foundIndex = values.findIndex((value) => value === contract.value);

//     if (foundIndex > -1) {
//       result[foundIndex] += 1;
//     }
//   });

//   return result;
// };

// const countNrContractsColor = (
//   player: IPlayer,
//   values: TProgressionValues[]
// ): number[] => {
//   const result = new Array<number>(values.length);
//   result.fill(0);
//   player.contractsFulfilled.forEach((contract) => {
//     // Does the contract contain one cargo of the values we are looking for?
//     let foundIndex = values.findIndex(
//       (value) => value === contract.cargo[0] || value === contract.cargo[1]
//     );

//     if (foundIndex > -1) {
//       result[foundIndex] += 1;
//     }
//   });

//   return result;
// };
// const countNrContractsRegion = (
//   player: IPlayer,
//   values: TProgressionValues[]
// ): number[] => {
//   const result = new Array<number>(values.length);
//   result.fill(0);
//   player.contractsFulfilled.forEach((contract) => {
//     // Does the contract region come the values we are looking for?
//     let foundIndex = values.findIndex((value) => value === contract.region);

//     if (foundIndex > -1) {
//       result[foundIndex] += 1;
//     }
//   });

//   return result;
// };

// const getFirstItem = (array: number[]): number => array[0];
// const sumItems = (array: number[]): number =>
//   array.reduce((sum, item) => sum + item, 0);

// const maxItem = (array: number[]): number =>
//   [...array].sort((a, b) => b - a)[0];

// const sumItemsMoreThanInner = (array: number[], x: number): number =>
//   array.reduce((sum, item) => (item >= x ? (sum += x) : sum), 0);
// // const sumItemsMoreThan = (x: number) => (array: number[], x: number) => sumItemsMoreThanInner(array, x);

// const sumItemsMoreThan = [
//   (array: number[]) => sumItemsMoreThanInner(array, 0),
//   (array: number[]) => sumItemsMoreThanInner(array, 1),
//   (array: number[]) => sumItemsMoreThanInner(array, 2),
//   (array: number[]) => sumItemsMoreThanInner(array, 3),
//   (array: number[]) => sumItemsMoreThanInner(array, 4),
//   (array: number[]) => sumItemsMoreThanInner(array, 5),
// ];

// const ACHIEVEMENTS = [
//   {
//     nrPlayers: [2, 5],
//     name: 'Banker',
//     side: 'A',
//     uuid: 'Banker_A_2-5_4P',
//     description: 'Four contracts worth 3 VP',
//     progressionFn: countNrContractsVP,
//     progressionArg: [3],
//     targetFn: getFirstItem,
//     target: 4,
//     value: 4,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Banker',
//     side: 'B',
//     uuid: 'Banker_B_2-5_4P',
//     description: 'Four contracts worth 3 or 5 VP',
//     progressionFn: countNrContractsVP,
//     progressionArg: [3, 5],
//     targetFn: sumItems,
//     target: 4,
//     value: 3,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Monoplist',
//     side: 'A',
//     uuid: '...',
//     description: 'Six contracts with same color',
//     progressionFn: countNrContractsColor,
//     progressionArg: cargoColors,
//     targetFn: maxItem,
//     target: 6,
//     value: 4,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Monoplist',
//     side: 'B',
//     uuid: '...',
//     description: 'Five contracts with same color',
//     progressionFn: countNrContractsColor,
//     progressionArg: cargoColors,
//     targetFn: maxItem,
//     target: 5,
//     value: 4,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Diversifier',
//     side: 'A',
//     uuid: '...',
//     description: 'One contract of each color',
//     progressionFn: countNrContractsColor,
//     progressionArg: cargoColors,
//     targetFn: sumItemsMoreThan[1],
//     target: cargoColors.length,
//     value: 4,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Diversifier',
//     side: 'B',
//     uuid: '...',
//     description: 'Two red, yellow, gray contracts',
//     progressionFn: countNrContractsColor,
//     progressionArg: ['red', 'yellow', 'gray'] as TCargo[],
//     targetFn: sumItemsMoreThan[2],
//     target: 6,
//     value: 4,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Regional Trader',
//     side: 'A',
//     uuid: '...',
//     description: 'Five Central contracts',
//     progressionFn: countNrContractsRegion,
//     progressionArg: ['Central'] as TRegion[],
//     targetFn: sumItems,
//     target: 5,
//     value: 5,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Regional Trader',
//     side: 'B',
//     uuid: '...',
//     description: 'Four Western contracts',
//     progressionFn: countNrContractsRegion,
//     progressionArg: ['West'] as TRegion[],
//     targetFn: sumItems,
//     target: 4,
//     value: 3,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Explorer',
//     side: 'A',
//     uuid: '...',
//     description: 'Two contracts from each region',
//     progressionFn: countNrContractsRegion,
//     progressionArg: ['West', 'Central', 'East'] as TRegion[],
//     targetFn: sumItemsMoreThan[2],
//     target: 6,
//     value: 5,
//   },
//   {
//     nrPlayers: [2, 5],
//     name: 'Explorer',
//     side: 'B',
//     uuid: '...',
//     description: 'One contract from each region',
//     progressionFn: countNrContractsRegion,
//     progressionArg: ['West', 'Central', 'East'] as TRegion[],
//     targetFn: sumItemsMoreThan[1],
//     target: 3,
//     value: 3,
//   },
// ];

const TEST_PLAYER: IPlayer = {
  color: 'black',
  user: { name: 'lynden', uuid: '1UiCjICtBFvRPSVb2cTAP', connected: true },
  hasMadeEndGameMove: false,
  hasTimedOut: false,
  timedOutRound: 0,
  timeLeft: 60 * 60 * 1000,
  contractsFulfilled: [
    {
      value: 2,
      cargo: ['yellow', 'brown'],
      region: 'East',
      uuid: 'E_yel_bro_2',
    },
    {
      value: 2,
      cargo: ['yellow', 'brown'],
      region: 'East',
      uuid: 'E_yel_bro_2',
    },
    {
      value: 1,
      cargo: ['gray', 'blue'],
      region: 'East',
      uuid: 'E_gry_blu_1',
    },
    {
      value: 1,
      cargo: ['gray', 'brown'],
      region: 'East',
      uuid: 'E_gry_bro_1',
    },
    {
      value: 3,
      cargo: ['red', 'gray'],
      region: 'East',
      uuid: 'E_red_gry_3',
    },
    {
      value: 3,
      cargo: ['red', 'gray'],
      region: 'West',
      uuid: 'W_red_gry_3',
    },
    {
      value: 3,
      cargo: ['black', 'gray'],
      region: 'West',
      uuid: 'W_red_gry_3',
    },
  ],
  citiesEmptied: [
    { name: 'Riga', value: 2 },
    { name: 'Tønsberg', value: 2 },
    { name: 'Brügge', value: 2 },
    { name: 'Bergen', value: 2 },
  ],
  achievements: [],
  achievementsProgress: [
    { uuid: 'Banker_A_2-5_4P', target: 4, progress: 0 },
    { uuid: 'Merchant_A_2-3_5P', target: 6, progress: 0 },
    { uuid: 'Diversifier_B_2-5_4P', target: 6, progress: 0 },
    { uuid: 'Supplier_A_2-3_4P', target: 3, progress: 0 },
    { uuid: 'Specialist_B_2-5_4P', target: 4, progress: 0 },
  ],
  position: { column: 8, row: 5 },
  victoryPoints: 47,
  cargo: ['black', 'blue', 'yellow', 'black', 'black'],
};

const test1 = () => {
  const player = MOCK_GAME.players[1];

  ACHIEVEMENTS.forEach((achievement) => {
    const progression = achievement.progressionFn(
      player,
      achievement.progressionArg
    );
    const target = achievement.targetFn(progression);

    console.log(achievement.name + achievement.side + ': ');
    console.log(progression);
    console.log(target);
    console.log('Fulfilled? ' + (target >= achievement.target));
    console.log('----------------------');
  });
};

const test = () => {
  const innerAchievement = ACHIEVEMENTS.find(
    (a) => a.uuid === 'Diversifier_A_2-5_4P'
    // (a) => a.uuid === 'Diversifier_B_2-5_4P'
  )!;

  const { progressionFn, progressionArg, targetFn } = innerAchievement;
  const progress = targetFn(progressionFn(TEST_PLAYER, progressionArg));

  console.log(TEST_PLAYER.contractsFulfilled);
  console.log(progress);

  // const nrPlayers = 5;

  // const achievements = pickRandomAchievements(nrPlayers);
  // console.log(achievements);

  // const newAchievements = updateAchievementsProgressAndReturnEarnedAchievements(
  //   MOCK_GAME.players[0],
  //   MOCK_GAME
  // );

  // console.log(MOCK_GAME.players[0].achievementsProgress);
};

test();
