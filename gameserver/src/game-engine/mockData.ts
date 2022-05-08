import { IChat, IGame, ISession } from '../../../shared/types';
import { ACHIEVEMENTS } from './constants';

export const MOCK_GAME: IGame = {
  name: 'lyndens game',
  uuid: 'dDV7I0PZkSX1SdDCILTkA',
  numberOfCitiesToEmpty: 10,
  achievements: ACHIEVEMENTS,
  players: [
    {
      color: 'black',
      user: { name: 'lynden', uuid: '1UiCjICtBFvRPSVb2cTAP', connected: true },
      hasMadeEndGameMove: false,
      contractsFulfilled: [
        {
          value: 2,
          cargo: ['yellow', 'brown'],
          region: 'East',
          uuid: 'EvoMx7W51Xb60Uqwy7HiT',
        },
        {
          value: 1,
          cargo: ['gray', 'blue'],
          region: 'East',
          uuid: 'rSbkbdrf9RJpDJnwYLc2J',
        },
        {
          value: 1,
          cargo: ['blue', 'black'],
          region: 'East',
          uuid: 'EQLqQThm8OKwAyAHXvA9R',
        },
        {
          value: 1,
          cargo: ['gray', 'brown'],
          region: 'East',
          uuid: 'Uzf_l70rNtWBYmaLgtqEk',
        },
        {
          value: 2,
          cargo: ['brown', 'black'],
          region: 'Central',
          uuid: 'HoBD28zx3ttULECB1hswG',
        },
        {
          value: 2,
          cargo: ['yellow', 'gray'],
          region: 'Central',
          uuid: 'SYMYYVuiZPDDT8Yx_8wdu',
        },
        {
          value: 2,
          cargo: ['green', 'black'],
          region: 'East',
          uuid: 'pBabiUuJCJufy3DeFOQ3b',
        },
        {
          value: 2,
          cargo: ['yellow', 'black'],
          region: 'East',
          uuid: 'CNI7ZLs55K4rJYbG5fecX',
        },
        {
          value: 1,
          cargo: ['green', 'black'],
          region: 'Central',
          uuid: 'dX84OF1c7CdagScHrLGIz',
        },
        {
          value: 2,
          cargo: ['yellow', 'gray'],
          region: 'East',
          uuid: 'se_I4iuUzb5sp7x9EMyJm',
        },
        {
          value: 2,
          cargo: ['gray', 'blue'],
          region: 'Central',
          uuid: 'U_Ruvk2D4jZwfpU3A574H',
        },
        {
          value: 2,
          cargo: ['gray', 'black'],
          region: 'Central',
          uuid: 'v3smshe0C1Nu2_U0OcUgj',
        },
        {
          value: 3,
          cargo: ['yellow', 'blue'],
          region: 'West',
          uuid: 'SUFkP64B4w0cFE2ygTTeJ',
        },
        {
          value: 3,
          cargo: ['red', 'gray'],
          region: 'East',
          uuid: 'MymJPq8yvLMalTrUl3wSH',
        },
        {
          value: 2,
          cargo: ['green', 'brown'],
          region: 'East',
          uuid: 'THQ3gMriycZjqMVxZtcBS',
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
        {
          value: 3,
          cargo: ['red', 'gray'],
          region: 'West',
          uuid: 'wLRSZ82TAFEl8que2ij3S',
        },
      ],
      citiesEmptied: [
        { name: 'Riga', value: 2 },
        { name: 'Tønsberg', value: 2 },
        { name: 'Brügge', value: 2 },
        { name: 'Bergen', value: 2 },
      ],
      achievements: [],
      position: { column: 8, row: 5 },
      victoryPoints: 47,
      cargo: ['brown', 'green', 'green', 'red', 'red'],
    },
    {
      color: 'blue',
      user: { name: 'person1', uuid: '4s1zxMT_G5DsCnP5GRk7l', connected: true },
      hasMadeEndGameMove: false,
      contractsFulfilled: [
        {
          value: 3,
          cargo: ['yellow', 'green'],
          region: 'East',
          uuid: 'eXjHwUcWu_UK89UyEwvwY',
        },
        {
          value: 2,
          cargo: ['yellow', 'brown'],
          region: 'Central',
          uuid: 'LwOETfgxM4OYi05AmKSNe',
        },
        {
          value: 2,
          cargo: ['blue', 'brown'],
          region: 'Central',
          uuid: 'TghTDjGU38xeQdw3M_Fwl',
        },
        {
          value: 2,
          cargo: ['green', 'blue'],
          region: 'West',
          uuid: '_vOZeJId7YSI4re_-mIXL',
        },
        {
          value: 1,
          cargo: ['brown', 'black'],
          region: 'West',
          uuid: 'OWOcGao39TV6vsFKOXoMA',
        },
        {
          value: 2,
          cargo: ['yellow', 'brown'],
          region: 'West',
          uuid: 'jVtL0cgl9JJ_LCYhgEvFG',
        },
        {
          value: 1,
          cargo: ['red', 'green'],
          region: 'West',
          uuid: 'UG-jwwulHx3kEv_7QQd64',
        },
        {
          value: 1,
          cargo: ['green', 'black'],
          region: 'West',
          uuid: 'IXswqOBAyvze16YsUOmTF',
        },
        {
          value: 2,
          cargo: ['blue', 'brown'],
          region: 'West',
          uuid: 'KsWTul4OeKyaybUYtjHY8',
        },
        {
          value: 3,
          cargo: ['red', 'black'],
          region: 'East',
          uuid: 'IDaDoVR5OV7WZAuoRYy3c',
        },
        {
          value: 2,
          cargo: ['gray', 'green'],
          region: 'East',
          uuid: '5Ow972DnpxV0dGjhWSz_e',
        },
        {
          value: 3,
          cargo: ['gray', 'brown'],
          region: 'Central',
          uuid: 'LoMy6sVS6pVZqLLGFZ7F0',
        },
        {
          value: 2,
          cargo: ['blue', 'black'],
          region: 'West',
          uuid: 'xyggQbyuR5JJo2VtUvjpo',
        },
        {
          value: 3,
          cargo: ['red', 'blue'],
          region: 'East',
          uuid: 'FBO0H113QxZfIXhEd0NYC',
        },
        {
          value: 5,
          cargo: ['red', 'yellow'],
          region: 'East',
          uuid: 'KZJ1E8lBtm0kn6K7sM5su',
        },
        {
          value: 3,
          cargo: ['gray', 'black'],
          region: 'West',
          uuid: 'tAu6Ys3ZiVsYkCUU2uxrg',
        },
        {
          value: 5,
          cargo: ['yellow', 'gray'],
          region: 'West',
          uuid: '3CKY67N_DmHxgSZIA_4e8',
        },
        {
          value: 3,
          cargo: ['gray', 'green'],
          region: 'West',
          uuid: '0su30UrM1HoYUTQStNnAa',
        },
        {
          value: 2,
          cargo: ['yellow', 'green'],
          region: 'West',
          uuid: 'MWBIisNtJWCn5sj-BFFdH',
        },
        {
          value: 2,
          cargo: ['red', 'black'],
          region: 'Central',
          uuid: 'iTZG_w50GqdlXs1N2zFrl',
        },
      ],
      citiesEmptied: [
        { name: 'Åbo', value: 2 },
        { name: 'Newcastle', value: 2 },
        { name: 'London', value: 2 },
        { name: 'Hamburg', value: 2 },
        { name: 'Stettin', value: 2 },
      ],
      achievements: [],
      position: { column: 6, row: 7 },
      victoryPoints: 59,
      cargo: ['green', 'red', 'yellow'],
    },
  ],
  board: [
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
    { column: 2, row: 1 },
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
        contracts: [
          {
            value: 2,
            cargo: ['red', 'blue'],
            region: 'Central',
            uuid: 'C4-zq7mtOCKYYqehvpSka',
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
        contracts: [
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
        contracts: [
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
    currentRound: {
      playerUuid: '4s1zxMT_G5DsCnP5GRk7l',
      movesLeft: 1,
      movesAvailable: ['sail', 'load'],
      achievementsEarned: [],
    },
    round: 100,
    status: 'playing',
    numberOfCitiesEmptied: 9,
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

export const MOCK_CHAT: IChat = {
  gameUuid: 'dDV7I0PZkSX1SdDCILTkA',
  messages: [
    {
      uuid: '0syDyCcqbi9f2Xhnx7PzS',
      from: {
        name: 'person1',
        uuid: '4s1zxMT_G5DsCnP5GRk7l',
        connected: true,
      },
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
    },
    {
      uuid: '78n7n4At3seZJ3DSeHLZy',
      from: {
        name: 'lynden',
        uuid: '1UiCjICtBFvRPSVb2cTAP',
        connected: true,
      },
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
    },
    {
      uuid: '2lJeKY38O5Gion6pGPoPr',
      from: {
        name: 'person1',
        uuid: '4s1zxMT_G5DsCnP5GRk7l',
        connected: true,
      },
      message:
        'lly unchanged. It was popularised in the 1960s with the release of Letraset sheets conta',
    },
    {
      uuid: 'Gb1Y-IdzB-Y4tvOThwCPV',
      from: {
        name: 'lynden',
        uuid: '1UiCjICtBFvRPSVb2cTAP',
        connected: true,
      },
      message:
        'Use setTimeout in your React components to execute a function or block of code after a period of time. Let’s explore ho',
    },
    {
      uuid: '3iAUyNQ6PzLwvBhNvWwSY',
      from: {
        name: 'lynden',
        uuid: '1UiCjICtBFvRPSVb2cTAP',
        connected: true,
      },
      message:
        'For example, the code below prints “Hello, World!” to the developer console after 3,000 milliseconds (or 3 seconds).',
    },
    {
      uuid: 'VUrYqPDVC9dV6TJ3Hn0TC',
      from: {
        name: 'person1',
        uuid: '4s1zxMT_G5DsCnP5GRk7l',
        connected: true,
      },
      message:
        'It is a long established fact that a reader will be distracted by the readable content of a pa',
    },
    {
      uuid: 'KAlgBRi7lwqahhbwogvZa',
      from: {
        name: 'lynden',
        uuid: '1UiCjICtBFvRPSVb2cTAP',
        connected: true,
      },
      message:
        'tTimeout inside of the useEffect Hook, which is the equivalent of the componentDidMount lifecycle method in Class components',
    },
  ],
};
