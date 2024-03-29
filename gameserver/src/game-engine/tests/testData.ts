import { ICity, IContract, IPlayer } from '../../../../shared/types';

// This player is in Visby where there are gray and black cargo
export const testPlayer: IPlayer = {
  user: {
    name: 'lynden',
    uuid: '1UiCjICtBFvRPSVb2cTAP',
    connected: true,
  },
  position: {
    column: 8,
    row: 3,
  },
  color: 'black',
  contractsFulfilled: [
    {
      value: 1,
      cargo: ['yellow', 'brown'],
      region: 'East',
      uuid: 'E_yel_bro_1',
    },
    {
      value: 5,
      cargo: ['red', 'green'],
      region: 'East',
      uuid: 'E_red_grn_5',
    },
    {
      value: 2,
      cargo: ['green', 'black'],
      region: 'East',
      uuid: 'E_grn_bla_2',
    },
    {
      value: 2,
      cargo: ['yellow', 'gray'],
      region: 'Central',
      uuid: 'C_yel_gry_2',
    },
    {
      value: 1,
      cargo: ['green', 'black'],
      region: 'Central',
      uuid: 'C_grn_bla_1',
    },
    {
      value: 2,
      cargo: ['red', 'black'],
      region: 'Central',
      uuid: 'C_red_bla_2',
    },
    {
      value: 2,
      cargo: ['yellow', 'brown'],
      region: 'West',
      uuid: 'W_yel_bro_2',
    },
    {
      value: 3,
      cargo: ['gray', 'brown'],
      region: 'West',
      uuid: 'W_gry_bro_3',
    },
    {
      value: 1,
      cargo: ['red', 'brown'],
      region: 'West',
      uuid: 'W_red_bro_1',
    },
  ],
  citiesEmptied: [
    { name: 'Riga', value: 2 },
    { name: 'Tønsberg', value: 2 },
    { name: 'Brügge', value: 2 },
  ],
  achievements: [],
  achievementsProgress: [
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Banker_A_2-5_4P',
      target: 4,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Banker_B_2-5_3P',
      target: 4,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Merchant_A_2-3_5P',
      target: 6,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Merchant_B_2-3_4P',
      target: 7,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Merchant_A_4-5_5P',
      target: 5,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [
          {
            value: 2,
            cargo: ['blue', 'brown'],
            region: 'East',
            uuid: 'E_blu_bro_2',
          },
          {
            value: 2,
            cargo: ['yellow', 'blue'],
            region: 'East',
            uuid: 'E_yel_blu_2',
          },
          {
            value: 2,
            cargo: ['red', 'black'],
            region: 'West',
            uuid: 'W_red_bla_2',
          },
          {
            value: 2,
            cargo: ['blue', 'black'],
            region: 'West',
            uuid: 'W_blu_bla_2',
          },
        ],
        cargo: [],
      },
      uuid: 'Merchant_B_4-5_4P',
      target: 6,
      progress: 4,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [
          'red',
          'red',
          'yellow',
          'gray',
          'green',
          'blue',
          'blue',
          'blue',
          'blue',
          'brown',
          'black',
          'black',
        ],
      },
      uuid: 'Diversifier_A_2-5_4P',
      target: 7,
      progress: 7,
      targetType: 'cargo',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: ['red', 'red', 'yellow', 'gray'],
      },
      uuid: 'Diversifier_B_2-5_4P',
      target: 6,
      progress: 4,
      targetType: 'cargo',
    },
    {
      achievedTargets: {
        cities: [
          {
            name: 'Åbo',
            value: 2,
          },
          {
            name: 'Newcastle',
            value: 2,
          },
        ],
        contracts: [],
        cargo: [],
      },
      uuid: 'Supplier_A_2-3_4P',
      target: 3,
      progress: 2,
      targetType: 'city',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Supplier_A_2-3_4P',
      target: 3,
      progress: 0,
      targetType: 'city',
    },
    {
      achievedTargets: {
        cities: [
          {
            name: 'Åbo',
            value: 2,
          },
          {
            name: 'Newcastle',
            value: 2,
          },
        ],
        contracts: [],
        cargo: [],
      },
      uuid: 'Supplier_B_4-5_3P',
      target: 2,
      progress: 2,
      targetType: 'city',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Supplier_B_4-5_3P',
      target: 2,
      progress: 0,
      targetType: 'city',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Monopolist_A_2-3_4P',
      target: 6,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Specialist_B_2-5_4P',
      target: 4,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Monopolist_B_4-5_3P',
      target: 5,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [
          {
            value: 2,
            cargo: ['blue', 'brown'],
            region: 'East',
            uuid: 'E_blu_bro_2',
          },
          {
            value: 2,
            cargo: ['yellow', 'blue'],
            region: 'East',
            uuid: 'E_yel_blu_2',
          },
          {
            value: 3,
            cargo: ['green', 'blue'],
            region: 'West',
            uuid: 'W_grn_blu_3',
          },
          {
            value: 2,
            cargo: ['blue', 'black'],
            region: 'West',
            uuid: 'W_blu_bla_2',
          },
        ],
        cargo: [],
      },
      uuid: 'Specialist_A_2-5_3P',
      target: 3,
      progress: 4,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Explorer_A_2-5_4P',
      target: 6,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Regional_A_2-5_5P',
      target: 5,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Explorer_B_2-5_3P',
      target: 3,
      progress: 0,
      targetType: 'contract',
    },
    {
      achievedTargets: {
        cities: [],
        contracts: [],
        cargo: [],
      },
      uuid: 'Regional_B_2-5_3P',
      target: 4,
      progress: 0,
      targetType: 'contract',
    },
  ],
  victoryPoints: 0,
  cargo: ['gray', 'black'],
  hasMadeEndGameMove: false,
  hasTimedOut: false,
  timeLeft: 3479450,
  timedOutRound: 0,
};

export const testCity: ICity = {
  name: 'Visby',
  nrContracts: 4,
  contracts: [
    {
      value: 2,
      cargo: ['yellow', 'blue'],
      region: 'East',
      uuid: 'E_yel_blu_2',
    },
    {
      value: 4,
      cargo: ['red', 'yellow'],
      region: 'Central',
      uuid: 'C_red_yel_4',
    },
  ],
  coatOfArms: '',
  goods: ['gray', 'black'],
  region: 'East',
};

export const testContracts: IContract[] = [
  {
    value: 2,
    cargo: ['yellow', 'blue'],
    region: 'East',
    uuid: 'E_yel_blu_2',
  },
  {
    value: 4,
    cargo: ['gray', 'yellow'],
    region: 'Central',
    uuid: 'C_red_yel_4',
  },
];
