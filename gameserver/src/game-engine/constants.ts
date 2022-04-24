import { TBoard } from '../../../shared/types';

export const MAX_MOVES = 2;
export const MAX_CARGO = 5;
export const VP_EMPTY_CITY = 2;

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
      name: 'Brügge',
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
      name: 'Tønsberg',
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
      name: 'Åbo',
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
