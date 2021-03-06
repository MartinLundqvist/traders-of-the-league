import {
  IAchievement,
  TAchievement,
  TBoard,
  TCargo,
  TPlayerColor,
  TRegion,
} from '../../../shared/types';

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

// To track the target number of "things" that must be achieved to earn an achievement
type TAchievementTargetMap = {
  [key in TAchievement]: number;
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
 * Game rules assert 16 specific achievements.
 * Their names are unique, so we do not need unique ids.
 */
export const ACHIEVEMENTS: IAchievement[] = [
  {
    name: 'Diversifier A',
    value: 4,
  },
  {
    name: 'Diversifier B',
    value: 4,
  },
  {
    name: 'Regional Trader A',
    value: 5,
  },
  {
    name: 'Regional Trader B',
    value: 3,
  },
  {
    name: 'Monopolist A',
    value: 4,
  },
  {
    name: 'Monopolist B',
    value: 3,
  },
  {
    name: 'Explorer A',
    value: 4,
  },
  {
    name: 'Explorer B',
    value: 3,
  },
  {
    name: 'Supplier A',
    value: 4,
  },
  {
    name: 'Supplier B',
    value: 3,
  },
  {
    name: 'Specialist A',
    value: 3,
  },
  {
    name: 'Specialist B',
    value: 4,
  },
  {
    name: 'Merchant A',
    value: 5,
  },
  {
    name: 'Merchant B',
    value: 4,
  },
  {
    name: 'Banker A',
    value: 4,
  },
  {
    name: 'Banker B',
    value: 3,
  },
];

export const ACHIEVEMENTS_TARGETS: TAchievementTargetMap = {
  'Diversifier A': 7,
  'Diversifier B': 6,
  'Regional Trader A': 5,
  'Regional Trader B': 4,
  'Monopolist A': 7,
  'Monopolist B': 6,
  'Explorer A': 6,
  'Explorer B': 3,
  'Supplier A': 3,
  'Supplier B': 2,
  'Specialist A': 4,
  'Specialist B': 4,
  'Merchant A': 6,
  'Merchant B': 7,
  'Banker A': 4,
  'Banker B': 4,
};

export const BOARD: TBoard = [
  {
    column: 0,
    row: 3,
    city: {
      name: 'Newcastle',
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
      name: 'Br??gge',
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
      name: 'T??nsberg',
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
      name: 'L??beck',
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
      name: '??bo',
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
      contracts: [],
      coatOfArms: '',
      goods: ['gray', 'gray'],
      region: 'East',
    },
  },
];
