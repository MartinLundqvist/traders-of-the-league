import { IGame, ISession } from '../../../shared/types';

export const MOCK_GAME: IGame = {
  name: 'lyndens game',
  uuid: 'dDV7I0PZkSX1SdDCILTkA',
  players: [
    {
      color: 'black',
      user: { name: 'lynden', uuid: '1UiCjICtBFvRPSVb2cTAP', connected: true },
      contractsFulfilled: [],
      citiesEmptied: [],
      achievements: [],
      position: { column: 10, row: 3 },
      victoryPoints: 0,
      cargo: ['yellow', 'black', 'brown', 'gray'],
    },
    {
      color: 'blue',
      user: { name: 'person1', uuid: '4s1zxMT_G5DsCnP5GRk7l', connected: true },
      contractsFulfilled: [],
      citiesEmptied: [],
      achievements: [],
      position: { column: 8, row: 5 },
      victoryPoints: 0,
      cargo: ['yellow', 'yellow', 'green', 'black'],
    },
  ],
  board: [
    {
      column: 0,
      row: 3,
      city: {
        name: 'Newcastle',
        contracts: [
          {
            value: 5,
            cargo: ['yellow', 'gray'],
            region: 'West',
            uuid: '3CKY67N_DmHxgSZIA_4e8',
          },
          {
            value: 1,
            cargo: ['green', 'black'],
            region: 'West',
            uuid: 'IXswqOBAyvze16YsUOmTF',
          },
          {
            value: 2,
            cargo: ['green', 'blue'],
            region: 'West',
            uuid: '_vOZeJId7YSI4re_-mIXL',
          },
        ],
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
        contracts: [
          {
            value: 3,
            cargo: ['gray', 'green'],
            region: 'West',
            uuid: '0su30UrM1HoYUTQStNnAa',
          },
          {
            value: 2,
            cargo: ['blue', 'black'],
            region: 'West',
            uuid: 'xyggQbyuR5JJo2VtUvjpo',
          },
          {
            value: 3,
            cargo: ['yellow', 'blue'],
            region: 'West',
            uuid: 'SUFkP64B4w0cFE2ygTTeJ',
          },
        ],
        coatOfArms: '',
        goods: ['red', 'red'],
        region: 'West',
      },
    },
    { column: 2, row: 1 },
    { column: 2, row: 3 },
    { column: 2, row: 5 },
    {
      column: 2,
      row: 7,
      city: {
        name: 'Brügge',
        contracts: [
          {
            value: 1,
            cargo: ['brown', 'black'],
            region: 'West',
            uuid: 'OWOcGao39TV6vsFKOXoMA',
          },
          {
            value: 3,
            cargo: ['gray', 'brown'],
            region: 'West',
            uuid: 'N8YTvSrzpcz8Z7qXl8YRe',
          },
          {
            value: 5,
            cargo: ['gray', 'blue'],
            region: 'West',
            uuid: 'CfPePpOlt8ABOvF44215f',
          },
        ],
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
        contracts: [
          {
            value: 1,
            cargo: ['red', 'green'],
            region: 'West',
            uuid: 'UG-jwwulHx3kEv_7QQd64',
          },
          {
            value: 3,
            cargo: ['gray', 'black'],
            region: 'West',
            uuid: 'tAu6Ys3ZiVsYkCUU2uxrg',
          },
          {
            value: 3,
            cargo: ['red', 'gray'],
            region: 'West',
            uuid: 'wLRSZ82TAFEl8que2ij3S',
          },
        ],
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
        contracts: [
          {
            value: 2,
            cargo: ['yellow', 'green'],
            region: 'West',
            uuid: 'MWBIisNtJWCn5sj-BFFdH',
          },
          {
            value: 2,
            cargo: ['blue', 'brown'],
            region: 'West',
            uuid: 'KsWTul4OeKyaybUYtjHY8',
          },
          {
            value: 2,
            cargo: ['yellow', 'brown'],
            region: 'West',
            uuid: 'jVtL0cgl9JJ_LCYhgEvFG',
          },
        ],
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
        contracts: [
          {
            value: 2,
            cargo: ['gray', 'black'],
            region: 'Central',
            uuid: 'v3smshe0C1Nu2_U0OcUgj',
          },
          {
            value: 2,
            cargo: ['blue', 'brown'],
            region: 'Central',
            uuid: 'TghTDjGU38xeQdw3M_Fwl',
          },
          {
            value: 3,
            cargo: ['gray', 'brown'],
            region: 'Central',
            uuid: 'LoMy6sVS6pVZqLLGFZ7F0',
          },
        ],
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
        contracts: [
          {
            value: 2,
            cargo: ['red', 'blue'],
            region: 'Central',
            uuid: 'C4-zq7mtOCKYYqehvpSka',
          },
          {
            value: 1,
            cargo: ['green', 'black'],
            region: 'Central',
            uuid: 'dX84OF1c7CdagScHrLGIz',
          },
          {
            value: 2,
            cargo: ['yellow', 'brown'],
            region: 'Central',
            uuid: 'LwOETfgxM4OYi05AmKSNe',
          },
        ],
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
        contracts: [
          {
            value: 5,
            cargo: ['red', 'gray'],
            region: 'Central',
            uuid: 'Xew5cKRQNUigZEimmrHsC',
          },
          {
            value: 1,
            cargo: ['green', 'blue'],
            region: 'Central',
            uuid: 'BqQPnsK6AA7u6IRBrbGLp',
          },
          {
            value: 2,
            cargo: ['brown', 'black'],
            region: 'Central',
            uuid: 'HoBD28zx3ttULECB1hswG',
          },
        ],
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
        contracts: [
          {
            value: 2,
            cargo: ['red', 'black'],
            region: 'Central',
            uuid: 'iTZG_w50GqdlXs1N2zFrl',
          },
          {
            value: 2,
            cargo: ['gray', 'blue'],
            region: 'Central',
            uuid: 'U_Ruvk2D4jZwfpU3A574H',
          },
          {
            value: 2,
            cargo: ['yellow', 'gray'],
            region: 'Central',
            uuid: 'SYMYYVuiZPDDT8Yx_8wdu',
          },
        ],
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
        contracts: [
          {
            value: 3,
            cargo: ['red', 'blue'],
            region: 'East',
            uuid: 'FBO0H113QxZfIXhEd0NYC',
          },
          {
            value: 2,
            cargo: ['green', 'brown'],
            region: 'East',
            uuid: 'THQ3gMriycZjqMVxZtcBS',
          },
          {
            value: 2,
            cargo: ['green', 'blue'],
            region: 'East',
            uuid: 'hquA4kDrGv2EYdoRqdj0P',
          },
        ],
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
        contracts: [
          {
            value: 2,
            cargo: ['yellow', 'blue'],
            region: 'East',
            uuid: '_58MjEDdjhkjBgl0ls9Ag',
          },
          {
            value: 2,
            cargo: ['gray', 'green'],
            region: 'East',
            uuid: '5Ow972DnpxV0dGjhWSz_e',
          },
          {
            value: 3,
            cargo: ['red', 'black'],
            region: 'East',
            uuid: 'IDaDoVR5OV7WZAuoRYy3c',
          },
        ],
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
        contracts: [
          {
            value: 2,
            cargo: ['yellow', 'gray'],
            region: 'East',
            uuid: 'se_I4iuUzb5sp7x9EMyJm',
          },
          {
            value: 3,
            cargo: ['yellow', 'green'],
            region: 'East',
            uuid: 'eXjHwUcWu_UK89UyEwvwY',
          },
          {
            value: 5,
            cargo: ['red', 'green'],
            region: 'East',
            uuid: '644fflzQz3Po-uAyyUPGn',
          },
        ],
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
        contracts: [
          {
            value: 2,
            cargo: ['green', 'black'],
            region: 'East',
            uuid: 'pBabiUuJCJufy3DeFOQ3b',
          },
          {
            value: 5,
            cargo: ['red', 'yellow'],
            region: 'East',
            uuid: 'KZJ1E8lBtm0kn6K7sM5su',
          },
          {
            value: 2,
            cargo: ['yellow', 'black'],
            region: 'East',
            uuid: 'CNI7ZLs55K4rJYbG5fecX',
          },
        ],
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
        contracts: [
          {
            value: 1,
            cargo: ['gray', 'blue'],
            region: 'East',
            uuid: 'rSbkbdrf9RJpDJnwYLc2J',
          },
          {
            value: 1,
            cargo: ['gray', 'brown'],
            region: 'East',
            uuid: 'Uzf_l70rNtWBYmaLgtqEk',
          },
          {
            value: 2,
            cargo: ['yellow', 'brown'],
            region: 'East',
            uuid: 'EvoMx7W51Xb60Uqwy7HiT',
          },
        ],
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
        contracts: [
          {
            value: 1,
            cargo: ['blue', 'black'],
            region: 'East',
            uuid: 'EQLqQThm8OKwAyAHXvA9R',
          },
          {
            value: 3,
            cargo: ['red', 'gray'],
            region: 'East',
            uuid: 'MymJPq8yvLMalTrUl3wSH',
          },
          {
            value: 3,
            cargo: ['red', 'brown'],
            region: 'East',
            uuid: 'uhQiVuCnzfMz0ThcwJWAX',
          },
        ],
        coatOfArms: '',
        goods: ['gray', 'gray'],
        region: 'East',
      },
    },
  ],
  state: {
    currentRound: { playerUuid: '4s1zxMT_G5DsCnP5GRk7l', movesLeft: 2 },
    round: 8,
    started: true,
    status: 'playing',
  },
};

export const MOCK_SESSIONS: ISession[] = [
  {
    user: { name: 'lynden', uuid: '1UiCjICtBFvRPSVb2cTAP', connected: true },
    activeGameUuid: 'dDV7I0PZkSX1SdDCILTkA',
    uuid: 'Tl-3NLoZNVOGGZMNInRz8',
  },
  {
    user: { name: 'person1', uuid: '4s1zxMT_G5DsCnP5GRk7l', connected: true },
    activeGameUuid: 'dDV7I0PZkSX1SdDCILTkA',
    uuid: 'ul0BTmoadsDeBo1yKysKb',
  },
];
