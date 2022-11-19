import {
  IContract,
  TBoard,
  TCargo,
  TPlayerColor,
  TRegion,
} from '../../../shared/types';

import {
  IAchievementInner,
  countNrContractsColor,
  countNrContractsRegion,
  countNrContractsVP,
  sumItems,
  sumItemsMoreThan,
  countNrCitiesEmptied,
  maxItem,
  countNrCargoColor,
} from './utils/achievementFunctions';

export const MAX_MOVES = 2;
export const MAX_CARGO = 5;
export const VP_EMPTY_CITY = 2;
export const CARGO_COLORS = 7;

type TPlayerColorMap = {
  [key: number]: TPlayerColor;
};

type TPlayerInitialCargoMap = {
  [key: number]: TCargo;
};

type TNumberOfCitiesToEmptyMap = {
  [key: number]: number;
};

export const playerColors: TPlayerColorMap = {
  0: 'black',
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'yellow',
};

export const cargoColors: TCargo[] = [
  'red',
  'yellow',
  'gray',
  'green',
  'blue',
  'brown',
  'black',
];

export const regions: TRegion[] = ['Central', 'East', 'West'];

export const playerInitialCargo: TPlayerInitialCargoMap = {
  // 0: Empty. No cargo.
  1: 'yellow',
  2: 'black',
  3: 'green',
  4: 'blue',
};

/**
 * Array indexed by [numberOfPlayers]: numberOfCitiesToEmpty
 */
export const numberOfCitiesToEmpty: TNumberOfCitiesToEmptyMap = {
  2: 5,
  3: 6,
  4: 7,
  5: 8,
};

/**
 * Game rules assert 6 specific achievements, of which there are typically an A and a B side.
 * The actual achievement values and targets depend on the number of players (either 2-3 or 4-5)
 * Their names are unique, so we do not need unique ids.
 */
export const ACHIEVEMENTS: IAchievementInner[] = [
  {
    nrPlayers: [2, 5],
    name: 'Banker',
    side: 'A',
    uuid: 'Banker_A_2-5_4P',
    description: 'Four contracts worth 3 VP',
    value: 4,
    progressionFn: countNrContractsVP,
    progressionArg: [3],
    targetFn: sumItems,
    target: 4,
  },
  {
    nrPlayers: [2, 5],
    name: 'Banker',
    side: 'B',
    uuid: 'Banker_B_2-5_3P',
    description: 'Four contracts worth 3 or 5 VP',
    value: 3,
    progressionFn: countNrContractsVP,
    progressionArg: [3, 5],
    targetFn: sumItems,
    target: 4,
  },
  {
    nrPlayers: [2, 3],
    name: 'Merchant',
    side: 'A',
    uuid: 'Merchant_A_2-3_5P',
    description: 'Six contracts worth 1 VP',
    value: 5,
    progressionFn: countNrContractsVP,
    progressionArg: [1],
    targetFn: sumItems,
    target: 6,
  },
  {
    nrPlayers: [2, 3],
    name: 'Merchant',
    side: 'B',
    uuid: 'Merchant_B_2-3_4P',
    description: 'Seven contracts worth 1 or 2 VP',
    value: 4,
    progressionFn: countNrContractsVP,
    progressionArg: [1, 2],
    targetFn: sumItems,
    target: 7,
  },
  {
    nrPlayers: [4, 5],
    name: 'Merchant',
    side: 'A',
    uuid: 'Merchant_A_4-5_5P',
    description: 'Five contracts worth 1 VP',
    value: 5,
    progressionFn: countNrContractsVP,
    progressionArg: [1],
    targetFn: sumItems,
    target: 5,
  },
  {
    nrPlayers: [4, 5],
    name: 'Merchant',
    side: 'B',
    uuid: 'Merchant_B_4-5_4P',
    description: 'Six contracts worth 1 or 2 VP',
    value: 4,
    progressionFn: countNrContractsVP,
    progressionArg: [1, 2],
    targetFn: sumItems,
    target: 6,
  },
  {
    nrPlayers: [2, 5],
    name: 'Diversifier',
    side: 'A',
    uuid: 'Diversifier_A_2-5_4P',
    description: 'One contract of each color',
    value: 4,
    progressionFn: countNrCargoColor,
    // progressionFn: countNrContractsColor,
    progressionArg: cargoColors,
    targetFn: sumItemsMoreThan[1],
    target: cargoColors.length,
  },
  {
    nrPlayers: [2, 5],
    name: 'Diversifier',
    side: 'B',
    uuid: 'Diversifier_B_2-5_4P',
    description: 'Two red, yellow, gray contracts',
    value: 4,
    progressionFn: countNrCargoColor,
    // progressionFn: countNrContractsColor,
    progressionArg: ['red', 'yellow', 'gray'] as TCargo[],
    targetFn: sumItemsMoreThan[2],
    target: 6,
  },
  {
    nrPlayers: [2, 3],
    name: 'Supplier',
    side: 'A',
    uuid: 'Supplier_A_2-3_4P',
    description: 'Three emptied cities',
    value: 4,
    progressionFn: countNrCitiesEmptied,
    progressionArg: [],
    targetFn: sumItems,
    target: 3,
  },
  {
    nrPlayers: [2, 3],
    name: 'Supplier',
    side: 'B',
    uuid: 'Supplier_A_2-3_4P',
    description: 'Three emptied cities',
    value: 4,
    progressionFn: countNrCitiesEmptied,
    progressionArg: [],
    targetFn: sumItems,
    target: 3,
  },
  {
    nrPlayers: [4, 5],
    name: 'Supplier',
    side: 'A',
    uuid: 'Supplier_B_4-5_3P',
    description: 'Two emptied cities',
    value: 3,
    progressionFn: countNrCitiesEmptied,
    progressionArg: [],
    targetFn: sumItems,
    target: 2,
  },
  {
    nrPlayers: [4, 5],
    name: 'Supplier',
    side: 'B',
    uuid: 'Supplier_B_4-5_3P',
    description: 'Two emptied cities',
    value: 3,
    progressionFn: countNrCitiesEmptied,
    progressionArg: [],
    targetFn: sumItems,
    target: 2,
  },
  {
    nrPlayers: [2, 3],
    name: 'Specialist',
    side: 'A',
    uuid: 'Monopolist_A_2-3_4P',
    description: 'Six contracts with same color',
    value: 4,
    progressionFn: countNrContractsColor,
    progressionArg: cargoColors,
    targetFn: maxItem,
    target: 6,
  },
  {
    nrPlayers: [2, 3],
    name: 'Specialist',
    side: 'B',
    uuid: 'Specialist_B_2-5_4P',
    description: 'Four green contracts',
    value: 4,
    progressionFn: countNrContractsColor,
    progressionArg: ['green'] as TCargo[],
    targetFn: sumItems,
    target: 4,
  },
  {
    nrPlayers: [4, 5],
    name: 'Specialist',
    side: 'A',
    uuid: 'Monopolist_B_4-5_3P',
    description: 'Five contracts with same color',
    value: 3,
    progressionFn: countNrContractsColor,
    progressionArg: cargoColors,
    targetFn: maxItem,
    target: 5,
  },
  {
    nrPlayers: [4, 5],
    name: 'Specialist',
    side: 'B',
    uuid: 'Specialist_A_2-5_3P',
    description: 'Three blue contracts',
    value: 3,
    progressionFn: countNrContractsColor,
    progressionArg: ['blue'] as TCargo[],
    targetFn: sumItems,
    target: 3,
  },
  {
    nrPlayers: [2, 3],
    name: 'Explorer',
    side: 'A',
    uuid: 'Explorer_A_2-5_4P',
    description: 'Two contracts from each region',
    value: 4,
    progressionFn: countNrContractsRegion,
    progressionArg: ['West', 'Central', 'East'] as TRegion[],
    targetFn: sumItemsMoreThan[2],
    target: 6,
  },
  {
    nrPlayers: [2, 3],
    name: 'Explorer',
    side: 'B',
    uuid: 'Regional_A_2-5_5P',
    description: 'Five Central contracts',
    value: 5,
    progressionFn: countNrContractsRegion,
    progressionArg: ['Central'] as TRegion[],
    targetFn: sumItems,
    target: 5,
  },
  {
    nrPlayers: [4, 5],
    name: 'Explorer',
    side: 'A',
    uuid: 'Explorer_B_2-5_3P',
    description: 'One contract from each region',
    value: 3,
    progressionFn: countNrContractsRegion,
    progressionArg: ['West', 'Central', 'East'] as TRegion[],
    targetFn: sumItemsMoreThan[1],
    target: 3,
  },
  {
    nrPlayers: [4, 5],
    name: 'Explorer',
    side: 'B',
    uuid: 'Regional_B_2-5_3P',
    description: 'Four Western contracts',
    value: 3,
    progressionFn: countNrContractsRegion,
    progressionArg: ['West'] as TRegion[],
    targetFn: sumItems,
    target: 4,
  },
];

export const ACHIEVEMENT_NAMES: string[] = [
  'Banker',
  'Merchant',
  'Diversifier',
  'Specialist',
  'Supplier',
  'Explorer',
];

export const BOARD: TBoard = [
  {
    column: 0,
    row: 3,
    city: {
      name: 'Newcastle',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['black', 'red'],
      region: 'West',
    },
  },
  { column: 1, row: 2 },
  { column: 1, row: 4 },
  { column: 1, row: 6 },
  {
    column: 1,
    row: 8,
    city: {
      name: 'London',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['red', 'red'],
      region: 'West',
    },
  },
  {
    column: 2,
    row: 1,
  },
  { column: 2, row: 3 },
  { column: 2, row: 5 },
  {
    column: 2,
    row: 7,
    city: {
      name: 'Brügge',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['brown', 'brown'],
      region: 'West',
    },
  },
  {
    column: 3,
    row: 0,
    city: {
      name: 'Bergen',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['green', 'green'],
      region: 'West',
    },
  },
  { column: 3, row: 2 },
  { column: 3, row: 4 },
  {
    column: 3,
    row: 6,
    city: {
      name: 'Hamburg',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['green', 'brown'],
      region: 'West',
    },
  },
  { column: 4, row: 1 },
  {
    column: 5,
    row: 0,
    city: {
      name: 'Tønsberg',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['blue'],
      region: 'Central',
    },
  },
  { column: 5, row: 2 },
  { column: 5, row: 4 },
  {
    column: 5,
    row: 6,
    city: {
      name: 'Lübeck',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['yellow', 'yellow'],
      region: 'Central',
    },
  },
  {
    column: 6,
    row: 5,
    city: {
      name: 'Falsterbo',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['black'],
      region: 'Central',
    },
  },
  {
    column: 6,
    row: 7,
    city: {
      name: 'Stettin',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['green', 'yellow'],
      region: 'Central',
    },
  },
  { column: 7, row: 4 },
  { column: 7, row: 6 },
  {
    column: 8,
    row: 1,
    city: {
      name: 'Stockholm',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['blue', 'brown'],
      region: 'East',
    },
  },
  {
    column: 8,
    row: 3,
    city: {
      name: 'Visby',
      nrContracts: 4,
      contracts: [],
      coatOfArms: '',
      goods: ['gray', 'black'],
      region: 'East',
    },
  },
  {
    column: 8,
    row: 5,
    city: {
      name: 'Danzig',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['black', 'brown'],
      region: 'East',
    },
  },
  {
    column: 9,
    row: 0,
    city: {
      name: 'Åbo',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['black', 'black'],
      region: 'East',
    },
  },
  { column: 9, row: 2 },
  { column: 9, row: 4 },
  { column: 10, row: 1 },
  {
    column: 10,
    row: 3,
    city: {
      name: 'Riga',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['blue', 'blue'],
      region: 'East',
    },
  },
  {
    column: 11,
    row: 0,
    city: {
      name: 'Reval',
      nrContracts: 3,
      contracts: [],
      coatOfArms: '',
      goods: ['gray', 'gray'],
      region: 'East',
    },
  },
];

export const CONTRACTS: IContract[] = [
  {
    value: 2,
    cargo: ['red', 'yellow'],
    region: 'West',
    uuid: 'W_red_yel_2',
  },
  {
    value: 2,
    cargo: ['red', 'yellow'],
    region: 'Central',
    uuid: 'C_red_yel_2',
  },
  {
    value: 5,
    cargo: ['red', 'yellow'],
    region: 'East',
    uuid: 'E_red_yel_5',
  },
  {
    value: 3,
    cargo: ['red', 'gray'],
    region: 'West',
    uuid: 'W_red_gry_3',
  },
  {
    value: 4,
    cargo: ['red', 'gray'],
    region: 'East',
    uuid: 'E_red_gry_4',
  },
  {
    value: 7,
    cargo: ['red', 'gray'],
    region: 'Central',
    uuid: 'C_red_gry_7',
  },
  {
    value: 3,
    cargo: ['red', 'gray'],
    region: 'East',
    uuid: 'E_red_gry_3',
  },
  {
    value: 1,
    cargo: ['red', 'green'],
    region: 'West',
    uuid: 'W_red_grn_1',
  },
  {
    value: 3,
    cargo: ['red', 'green'],
    region: 'Central',
    uuid: 'C_red_grn_3',
  },
  {
    value: 5,
    cargo: ['red', 'green'],
    region: 'East',
    uuid: 'E_red_grn_5',
  },
  {
    value: 2,
    cargo: ['red', 'blue'],
    region: 'West',
    uuid: 'W_red_blu_2',
  },
  {
    value: 2,
    cargo: ['red', 'blue'],
    region: 'Central',
    uuid: 'C_red_blu_2',
  },
  {
    value: 3,
    cargo: ['red', 'blue'],
    region: 'East',
    uuid: 'E_red_blu_3',
  },
  {
    value: 1,
    cargo: ['red', 'brown'],
    region: 'West',
    uuid: 'W_red_bro_1',
  },
  {
    value: 3,
    cargo: ['red', 'brown'],
    region: 'Central',
    uuid: 'C_red_bro_3',
  },
  {
    value: 3,
    cargo: ['red', 'brown'],
    region: 'East',
    uuid: 'E_red_bro_3',
  },
  {
    value: 2,
    cargo: ['red', 'black'],
    region: 'West',
    uuid: 'W_red_bla_2',
  },
  {
    value: 2,
    cargo: ['red', 'black'],
    region: 'Central',
    uuid: 'C_red_bla_2',
  },
  {
    value: 3,
    cargo: ['red', 'black'],
    region: 'East',
    uuid: 'E_red_bla_3',
  },
  {
    value: 5,
    cargo: ['yellow', 'gray'],
    region: 'West',
    uuid: 'W_yel_gry_5',
  },
  {
    value: 2,
    cargo: ['yellow', 'gray'],
    region: 'Central',
    uuid: 'C_yel_gry_2',
  },
  {
    value: 2,
    cargo: ['yellow', 'gray'],
    region: 'East',
    uuid: 'E_yel_gry_2',
  },
  {
    value: 2,
    cargo: ['yellow', 'green'],
    region: 'West',
    uuid: 'W_yel_grn_2',
  },
  {
    value: 2,
    cargo: ['yellow', 'green'],
    region: 'Central',
    uuid: 'C_yel_grn_2',
  },
  {
    value: 3,
    cargo: ['yellow', 'green'],
    region: 'East',
    uuid: 'E_yel_grn_3',
  },
  {
    value: 3,
    cargo: ['yellow', 'blue'],
    region: 'West',
    uuid: 'W_yel_blu_3',
  },
  {
    value: 1,
    cargo: ['yellow', 'blue'],
    region: 'Central',
    uuid: 'C_yel_blu_1',
  },
  {
    value: 2,
    cargo: ['yellow', 'blue'],
    region: 'East',
    uuid: 'E_yel_blu_2',
  },
  {
    value: 2,
    cargo: ['yellow', 'brown'],
    region: 'West',
    uuid: 'W_yel_bro_2',
  },
  {
    value: 2,
    cargo: ['yellow', 'brown'],
    region: 'Central',
    uuid: 'C_yel_bro_2',
  },
  {
    value: 2,
    cargo: ['yellow', 'brown'],
    region: 'East',
    uuid: 'E_yel_bro_2',
  },
  {
    value: 1,
    cargo: ['yellow', 'brown'],
    region: 'East',
    uuid: 'E_yel_bro_1',
  },
  {
    value: 2,
    cargo: ['yellow', 'black'],
    region: 'West',
    uuid: 'W_yel_bla_2',
  },
  {
    value: 1,
    cargo: ['yellow', 'black'],
    region: 'Central',
    uuid: 'C_yel_bla_1',
  },
  {
    value: 2,
    cargo: ['yellow', 'black'],
    region: 'East',
    uuid: 'E_yel_bla_2',
  },
  {
    value: 1,
    cargo: ['yellow', 'black'],
    region: 'East',
    uuid: 'E_yel_bla_1',
  },
  {
    value: 3,
    cargo: ['gray', 'green'],
    region: 'West',
    uuid: 'W_gry_grn_3',
  },
  {
    value: 2,
    cargo: ['gray', 'green'],
    region: 'Central',
    uuid: 'C_gry_grn_2',
  },
  {
    value: 2,
    cargo: ['gray', 'green'],
    region: 'East',
    uuid: 'E_gry_grn_2',
  },
  {
    value: 5,
    cargo: ['gray', 'blue'],
    region: 'West',
    uuid: 'W_gry_blu_5',
  },
  {
    value: 2,
    cargo: ['gray', 'blue'],
    region: 'Central',
    uuid: 'C_gry_blu_2',
  },
  {
    value: 3,
    cargo: ['gray', 'blue'],
    region: 'Central',
    uuid: 'C_gry_blu_3',
  },
  {
    value: 1,
    cargo: ['gray', 'blue'],
    region: 'East',
    uuid: 'E_gry_blu_1',
  },
  {
    value: 3,
    cargo: ['gray', 'brown'],
    region: 'West',
    uuid: 'W_gry_bro_3',
  },
  {
    value: 3,
    cargo: ['gray', 'brown'],
    region: 'Central',
    uuid: 'C_gry_bro_3',
  },
  {
    value: 1,
    cargo: ['gray', 'brown'],
    region: 'East',
    uuid: 'E_gry_bro_1',
  },
  {
    value: 3,
    cargo: ['gray', 'black'],
    region: 'West',
    uuid: 'W_gry_bla_3',
  },
  {
    value: 2,
    cargo: ['gray', 'black'],
    region: 'Central',
    uuid: 'C_gry_bla_2',
  },
  {
    value: 2,
    cargo: ['gray', 'black'],
    region: 'East',
    uuid: 'E_gry_bla_2',
  },
  {
    value: 2,
    cargo: ['green', 'blue'],
    region: 'West',
    uuid: 'W_grn_blu_2',
  },
  {
    value: 1,
    cargo: ['green', 'blue'],
    region: 'Central',
    uuid: 'C_grn_blu_1',
  },
  {
    value: 2,
    cargo: ['green', 'blue'],
    region: 'East',
    uuid: 'E_grn_blu_2',
  },
  {
    value: 3,
    cargo: ['green', 'blue'],
    region: 'East',
    uuid: 'E_grn_blu_3',
  },
  //TODO: Add a 'green', 'blue' in West with value 3
  {
    value: 2,
    cargo: ['green', 'brown'],
    region: 'West',
    uuid: 'W_grn_bro_2',
  },
  {
    value: 2,
    cargo: ['green', 'brown'],
    region: 'Central',
    uuid: 'C_grn_bro_2',
  },
  {
    value: 2,
    cargo: ['green', 'brown'],
    region: 'East',
    uuid: 'E_grn_bro_2',
  },
  {
    value: 1,
    cargo: ['green', 'black'],
    region: 'West',
    uuid: 'W_grn_bla_1',
  },
  {
    value: 1,
    cargo: ['green', 'black'],
    region: 'Central',
    uuid: 'C_grn_bla_1',
  },
  {
    value: 2,
    cargo: ['green', 'black'],
    region: 'East',
    uuid: 'E_grn_bla_2',
  },
  {
    value: 2,
    cargo: ['blue', 'brown'],
    region: 'West',
    uuid: 'W_blu_bro_2',
  },
  {
    value: 2,
    cargo: ['blue', 'brown'],
    region: 'Central',
    uuid: 'C_blu_bro_2',
  },
  {
    value: 3,
    cargo: ['blue', 'brown'],
    region: 'Central',
    uuid: 'C_blu_bro_3',
  },
  {
    value: 2,
    cargo: ['blue', 'brown'],
    region: 'East',
    uuid: 'E_blu_bro_2',
  },
  {
    value: 2,
    cargo: ['blue', 'black'],
    region: 'West',
    uuid: 'W_blu_bla_2',
  },
  {
    value: 1,
    cargo: ['blue', 'black'],
    region: 'Central',
    uuid: 'C_blu_bla_1',
  },
  {
    value: 1,
    cargo: ['blue', 'black'],
    region: 'East',
    uuid: 'E_blu_bla_1',
  },
  {
    value: 1,
    cargo: ['brown', 'black'],
    region: 'West',
    uuid: 'W_bro_bla_1',
  },
  {
    value: 2,
    cargo: ['brown', 'black'],
    region: 'West',
    uuid: 'W_bro_bla_2',
  },
  {
    value: 2,
    cargo: ['brown', 'black'],
    region: 'Central',
    uuid: 'C_bro_bla_2',
  },
  {
    value: 2,
    cargo: ['brown', 'black'],
    region: 'East',
    uuid: 'E_bro_bla_2',
  },
];
