import { ICity } from '../../../shared/types';
import newcastle from '../assets/newcastle.png';
import abo from '../assets/abo.png';
import bergen from '../assets/bergen.png';
import brugge from '../assets/brugge.png';
import danzig from '../assets/danzig.png';
import falsterbo from '../assets/falsterbo.png';
import hamburg from '../assets/hamburg.png';
import london from '../assets/london.png';
import lubeck from '../assets/lubeck.png';
import reval from '../assets/reval.png';
import riga from '../assets/riga.png';
import stettin from '../assets/stettin.png';
import stockholm from '../assets/stockholm.png';
import tonsberg from '../assets/tonsberg.png';
import visby from '../assets/visby.png';

interface IBoardLayoutElement {
  column: number;
  row: number;
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
  city?: ICity;
}

export const BOARD_LAYOUT: IBoardLayoutElement[] = [
  {
    column: 0,
    row: 3,
    city: {
      name: 'Newcastle',
      contracts: [],
      coatOfArms: newcastle,
      goods: ['black', 'red'],
      region: 'West',
    },
    north: true,
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
      coatOfArms: london,
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
      coatOfArms: brugge,
      goods: ['brown', 'brown'],
      region: 'West',
    },
    west: true,
  },
  {
    column: 3,
    row: 0,
    city: {
      name: 'Bergen',
      contracts: [],
      coatOfArms: bergen,
      goods: ['green', 'green'],
      region: 'West',
    },
    north: true,
  },
  { column: 3, row: 2 },
  { column: 3, row: 4 },
  {
    column: 3,
    row: 6,
    city: {
      name: 'Hamburg',
      contracts: [],
      coatOfArms: hamburg,
      goods: ['green', 'brown'],
      region: 'West',
    },
    west: true,
  },
  { column: 4, row: 1 },
  {
    column: 5,
    row: 0,
    city: {
      name: 'Tønsberg',
      contracts: [],
      coatOfArms: tonsberg,
      goods: ['blue'],
      region: 'Central',
    },
    north: true,
  },
  { column: 5, row: 2 },
  { column: 5, row: 4 },
  {
    column: 5,
    row: 6,
    city: {
      name: 'Lübeck',
      contracts: [],
      coatOfArms: lubeck,
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
      coatOfArms: falsterbo,
      goods: ['black'],
      region: 'Central',
    },
    north: true,
    center: true,
  },
  {
    column: 6,
    row: 7,
    city: {
      name: 'Stettin',
      contracts: [],
      coatOfArms: stettin,
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
      coatOfArms: stockholm,
      goods: ['blue', 'brown'],
      region: 'East',
    },
    north: true,
  },
  {
    column: 8,
    row: 3,
    city: {
      name: 'Visby',
      contracts: [],
      coatOfArms: visby,
      goods: ['gray', 'black'],
      region: 'East',
    },
    farEast: true,
    north: true,
  },
  {
    column: 8,
    row: 5,
    city: {
      name: 'Danzig',
      contracts: [],
      coatOfArms: danzig,
      goods: ['black', 'brown'],
      region: 'East',
    },
    west: true,
  },
  {
    column: 9,
    row: 0,
    city: {
      name: 'Åbo',
      contracts: [],
      coatOfArms: abo,
      goods: ['black', 'black'],
      region: 'East',
    },
    north: true,
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
      coatOfArms: riga,
      goods: ['blue', 'blue'],
      region: 'East',
    },
    west: true,
  },
  {
    column: 11,
    row: 0,
    city: {
      name: 'Reval',
      contracts: [],
      coatOfArms: reval,
      goods: ['gray', 'gray'],
      region: 'East',
    },
    north: true,
  },
];
