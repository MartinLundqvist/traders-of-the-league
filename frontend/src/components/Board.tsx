import styled, { css } from 'styled-components';
import Hex from '../elements/Hex';
import { ICity } from '../../../shared/types';

const HEX_MAX_DIAMETER = 110;
const HEX_MIN_DIAMETER = (HEX_MAX_DIAMETER * Math.sqrt(3)) / 2;
const HEX_SIDE_LENGTH = HEX_MAX_DIAMETER / Math.sqrt(3);
const HEX_TOP_OFFSET = HEX_MIN_DIAMETER - 2;
const HEX_LEFT_OFFSET = (HEX_MAX_DIAMETER + HEX_SIDE_LENGTH) / 2 - 6;

interface IBoardLayoutElement {
  column: number;
  row: number;
  north?: boolean;
  west?: boolean;
  center?: boolean;
  farEast?: boolean;
  city?: ICity;
}

const BOARD_LAYOUT: IBoardLayoutElement[] = [
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
    west: true,
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
      coatOfArms: '',
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
      name: 'Tonsberg',
      contracts: [],
      coatOfArms: '',
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
    north: true,
    center: true,
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
    north: true,
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
    farEast: true,
    north: true,
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
    west: true,
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
      coatOfArms: '',
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
      coatOfArms: '',
      goods: ['gray', 'gray'],
      region: 'East',
    },
    north: true,
  },
];

console.log('Side length: ' + HEX_SIDE_LENGTH);
console.log('Min diameter: ' + HEX_MIN_DIAMETER);
console.log('Max diameter: ' + HEX_MAX_DIAMETER);
console.log('Number of hexes: ' + BOARD_LAYOUT.length);

const Wrapper = styled.div`
  position: relative;
  grid-area: game;
  place-self: center;
  width: ${12 * HEX_LEFT_OFFSET + HEX_SIDE_LENGTH / 2}px;
  height: ${5 * HEX_MIN_DIAMETER}px;
`;

const Hexagons = BOARD_LAYOUT.map((hex, index) => (
  <Hex
    id={index}
    left={`${hex.column * HEX_LEFT_OFFSET}px`}
    top={`${(hex.row * HEX_TOP_OFFSET) / 2}px`}
    height={`${HEX_MIN_DIAMETER}px`}
    width={`${HEX_MAX_DIAMETER}px`}
    city={hex.city}
    key={index}
    north={hex.north}
    west={hex.west}
    center={hex.center}
    farEast={hex.farEast}
  />
));

const Board = (): JSX.Element => {
  return <Wrapper>{Hexagons}</Wrapper>;
};

export default Board;
