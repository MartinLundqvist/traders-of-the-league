import { IChat, IGame, ISession } from '../../../shared/types';
import { getHexesWithinRangeOf } from './getHexesWithinRangeOf';

export const MOCK_GAME: IGame = {
  name: 'lyndens game',
  uuid: 'dDV7I0PZkSX1SdDCILTkA',
  numberOfCitiesToEmpty: 10,
  achievements: [
    { name: 'Diversifier A', value: 4 },
    { name: 'Merchant A', value: 5 },
    { name: 'Regional Trader A', value: 5 },
    { name: 'Monopolist B', value: 3 },
    { name: 'Specialist A', value: 3 },
  ],
  startTime: new Date().getTime(),
  endTime: 0,
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
      cargo: ['black', 'blue', 'yellow', 'black', 'black'],
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
      cargo: ['green', 'red', 'yellow', 'blue'],
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
            value: 1,
            cargo: ['blue', 'black'],
            region: 'East',
            uuid: '644fflzQz3Po-uAyyUPGnd',
          },
          {
            value: 2,
            cargo: ['yellow', 'brown'],
            region: 'East',
            uuid: '644fflzQz3Po-uAyyUPGne',
          },
          {
            value: 2,
            cargo: ['yellow', 'black'],
            region: 'East',
            uuid: '644fflzQz3Po-uAyyUPGnf',
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
      hexesWithinRange: getHexesWithinRangeOf({ column: 6, row: 7 }),
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
    email: 'iphonelynden@gmail.com',
  },
  {
    user: { name: 'person1', uuid: '4s1zxMT_G5DsCnP5GRk7l', connected: true },
    activeGameUuid: 'dDV7I0PZkSX1SdDCILTkA',
    uuid: 'ul0BTmoadsDeBo1yKysKb',
    email: 'person1@mock.now',
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

export const MOCK_GAME_5: IGame = {
  state: {
    currentRound: {
      playerUuid: '8YNzwnOSPAAEAwK9bHdYy',
      movesLeft: 2,
      movesAvailable: ['load', 'sail', 'trade'],
      hexesWithinRange: [
        { row: 4, column: 5, _id: '628e48b78957fc7aeeaa8871' },
        { row: 5, column: 6, _id: '628e48b78957fc7aeeaa8872' },
        { row: 7, column: 6, _id: '628e48b78957fc7aeeaa8873' },
        { row: 2, column: 5, _id: '628e48b78957fc7aeeaa8874' },
        { row: 6, column: 5, _id: '628e48b78957fc7aeeaa8875' },
        { row: 4, column: 7, _id: '628e48b78957fc7aeeaa8876' },
        { row: 6, column: 7, _id: '628e48b78957fc7aeeaa8877' },
        { row: 1, column: 4, _id: '628e48b78957fc7aeeaa8878' },
        { row: 0, column: 5, _id: '628e48b78957fc7aeeaa8879' },
        { row: 3, column: 8, _id: '628e48b78957fc7aeeaa887a' },
        { row: 5, column: 8, _id: '628e48b78957fc7aeeaa887b' },
      ],
      achievementsEarned: [],
    },
    status: 'playing',
    round: 1,
    numberOfCitiesEmptied: 0,
  },
  _id: '628e44603d3048d71fb9330a',
  name: 'newgame',
  uuid: 'UeeJKwv2qT_PcUbWA2Iuv',
  startTime: 1653491895108,
  endTime: 0,
  players: [
    {
      user: { name: 'Person2', uuid: '8YNzwnOSPAAEAwK9bHdYy', connected: true },
      position: { column: 5, row: 6 },
      color: 'black',
      contractsFulfilled: [],
      citiesEmptied: [],
      achievements: [],
      victoryPoints: 0,
      cargo: [],
      hasMadeEndGameMove: false,
      _id: '628e446046c2a7caef6f1358',
    },
    {
      user: {
        name: 'Jan Johanssen',
        uuid: 'q1VmykgjMt3gcpvXvGyIR',
        connected: true,
      },
      position: { column: 5, row: 6 },
      color: 'blue',
      contractsFulfilled: [],
      citiesEmptied: [],
      achievements: [],
      victoryPoints: 0,
      cargo: ['yellow'],
      hasMadeEndGameMove: false,
      _id: '628e47c68957fc7aeeaa8715',
    },
    {
      user: { name: 'Person3', uuid: 'Vr2LJteMKXN6RAS5Ae8qs', connected: true },
      position: { column: 5, row: 6 },
      color: 'green',
      contractsFulfilled: [],
      citiesEmptied: [],
      achievements: [],
      victoryPoints: 0,
      cargo: ['black'],
      hasMadeEndGameMove: false,
      _id: '628e482a8957fc7aeeaa876b',
    },
    {
      user: { name: 'Person4', uuid: 'v87ki0VQLVv23RCuUZY77', connected: true },
      position: { column: 5, row: 6 },
      color: 'red',
      contractsFulfilled: [],
      citiesEmptied: [],
      achievements: [],
      victoryPoints: 0,
      cargo: ['green'],
      hasMadeEndGameMove: false,
      _id: '628e48618957fc7aeeaa87c2',
    },
    {
      user: { name: 'Person5', uuid: 'WjDMXFE9z1WqHxY7P7fv7', connected: true },
      position: { column: 5, row: 6 },
      color: 'yellow',
      contractsFulfilled: [],
      citiesEmptied: [],
      achievements: [],
      victoryPoints: 0,
      cargo: ['blue'],
      hasMadeEndGameMove: false,
      _id: '628e489c8957fc7aeeaa881a',
    },
  ],
  numberOfCitiesToEmpty: 8,
  board: [
    {
      city: {
        name: 'Newcastle',
        goods: ['black', 'red'],
        contracts: [
          {
            value: 1,
            cargo: ['red', 'brown'],
            region: 'West',
            uuid: 'pC8rw7ijEiu-5rxp8g95i',
            _id: '628e48b78957fc7aeeaa887c',
          },
          {
            value: 3,
            cargo: ['gray', 'brown'],
            region: 'West',
            uuid: 'QLvzsCtbikEZJ39tUlm-S',
            _id: '628e48b78957fc7aeeaa887d',
          },
          {
            value: 3,
            cargo: ['gray', 'black'],
            region: 'West',
            uuid: '99hu3Ep-qNYxUF-bDLbux',
            _id: '628e48b78957fc7aeeaa887e',
          },
        ],
        coatOfArms: '',
        region: 'West',
        _id: '628e446046c2a7caef6f131a',
      },
      column: 0,
      row: 3,
      _id: '628e446046c2a7caef6f1319',
    },
    { column: 1, row: 2, _id: '628e446046c2a7caef6f131b' },
    { column: 1, row: 4, _id: '628e446046c2a7caef6f131c' },
    { column: 1, row: 6, _id: '628e446046c2a7caef6f131d' },
    {
      city: {
        name: 'London',
        goods: ['red', 'red'],
        contracts: [
          {
            value: 1,
            cargo: ['red', 'green'],
            region: 'West',
            uuid: 'TSJvHXk3j2z-ZZ3nTl2y2',
            _id: '628e48b78957fc7aeeaa887f',
          },
          {
            value: 3,
            cargo: ['gray', 'green'],
            region: 'West',
            uuid: '5AxLK72yZhMBuajPC8g0Q',
            _id: '628e48b78957fc7aeeaa8880',
          },
          {
            value: 3,
            cargo: ['yellow', 'blue'],
            region: 'West',
            uuid: 's4mrv_thHz5RbYr_O5IoZ',
            _id: '628e48b78957fc7aeeaa8881',
          },
        ],
        coatOfArms: '',
        region: 'West',
        _id: '628e446046c2a7caef6f131f',
      },
      column: 1,
      row: 8,
      _id: '628e446046c2a7caef6f131e',
    },
    { column: 2, row: 1, _id: '628e446046c2a7caef6f1320' },
    { column: 2, row: 3, _id: '628e446046c2a7caef6f1321' },
    { column: 2, row: 5, _id: '628e446046c2a7caef6f1322' },
    {
      city: {
        name: 'Brügge',
        goods: ['brown', 'brown'],
        contracts: [
          {
            value: 2,
            cargo: ['red', 'blue'],
            region: 'West',
            uuid: 'Ho0-XIO_77I37_ZFdvxD-',
            _id: '628e48b78957fc7aeeaa8882',
          },
          {
            value: 2,
            cargo: ['blue', 'brown'],
            region: 'West',
            uuid: 'p4QPwcAOmkdFaDsLZss9F',
            _id: '628e48b78957fc7aeeaa8883',
          },
          {
            value: 2,
            cargo: ['green', 'blue'],
            region: 'West',
            uuid: 'OqcMRkm-POhHylIPPFnoh',
            _id: '628e48b78957fc7aeeaa8884',
          },
        ],
        coatOfArms: '',
        region: 'West',
        _id: '628e446046c2a7caef6f1324',
      },
      column: 2,
      row: 7,
      _id: '628e446046c2a7caef6f1323',
    },
    {
      city: {
        name: 'Bergen',
        goods: ['green', 'green'],
        contracts: [
          {
            value: 2,
            cargo: ['blue', 'black'],
            region: 'West',
            uuid: 'iZ6dQ969CQSNhqE6b0Ej1',
            _id: '628e48b78957fc7aeeaa8885',
          },
          {
            value: 2,
            cargo: ['yellow', 'black'],
            region: 'West',
            uuid: 'OzThRJLV8qxmrlL2nV9_5',
            _id: '628e48b78957fc7aeeaa8886',
          },
          {
            value: 5,
            cargo: ['yellow', 'gray'],
            region: 'West',
            uuid: 'L7jdLCpxkbwS8CMb4erEc',
            _id: '628e48b78957fc7aeeaa8887',
          },
        ],
        coatOfArms: '',
        region: 'West',
        _id: '628e446046c2a7caef6f1326',
      },
      column: 3,
      row: 0,
      _id: '628e446046c2a7caef6f1325',
    },
    { column: 3, row: 2, _id: '628e446046c2a7caef6f1327' },
    { column: 3, row: 4, _id: '628e446046c2a7caef6f1328' },
    {
      city: {
        name: 'Hamburg',
        goods: ['green', 'brown'],
        contracts: [
          {
            value: 2,
            cargo: ['yellow', 'brown'],
            region: 'West',
            uuid: 'LF5t7flGZ0twa0zqfmu4q',
            _id: '628e48b78957fc7aeeaa8888',
          },
          {
            value: 2,
            cargo: ['red', 'yellow'],
            region: 'West',
            uuid: 'DU_NV4l_RoBqVyLiqkMUK',
            _id: '628e48b78957fc7aeeaa8889',
          },
          {
            value: 3,
            cargo: ['red', 'gray'],
            region: 'West',
            uuid: 'KCG4ov6u1XIeovmAG8drq',
            _id: '628e48b78957fc7aeeaa888a',
          },
        ],
        coatOfArms: '',
        region: 'West',
        _id: '628e446046c2a7caef6f132a',
      },
      column: 3,
      row: 6,
      _id: '628e446046c2a7caef6f1329',
    },
    { column: 4, row: 1, _id: '628e446046c2a7caef6f132b' },
    {
      city: {
        name: 'Tønsberg',
        goods: ['blue'],
        contracts: [
          {
            value: 2,
            cargo: ['yellow', 'gray'],
            region: 'Central',
            uuid: 'a9rzX-nRe0G_WVWQuG7G4',
            _id: '628e48b78957fc7aeeaa888b',
          },
          {
            value: 2,
            cargo: ['red', 'yellow'],
            region: 'Central',
            uuid: 'DGeSUofnIjTGMgAiyyzgC',
            _id: '628e48b78957fc7aeeaa888c',
          },
          {
            value: 1,
            cargo: ['yellow', 'black'],
            region: 'Central',
            uuid: 'Tl2a_huAc78rZgoqC_X6h',
            _id: '628e48b78957fc7aeeaa888d',
          },
        ],
        coatOfArms: '',
        region: 'Central',
        _id: '628e446046c2a7caef6f132d',
      },
      column: 5,
      row: 0,
      _id: '628e446046c2a7caef6f132c',
    },
    { column: 5, row: 2, _id: '628e446046c2a7caef6f132e' },
    { column: 5, row: 4, _id: '628e446046c2a7caef6f132f' },
    {
      city: {
        name: 'Lübeck',
        goods: ['yellow', 'yellow'],
        contracts: [
          {
            value: 2,
            cargo: ['gray', 'green'],
            region: 'Central',
            uuid: 'z9_aI8M0woFtpH7C5S4Vn',
            _id: '628e48b78957fc7aeeaa888e',
          },
          {
            value: 2,
            cargo: ['red', 'blue'],
            region: 'Central',
            uuid: 'Me0jOacnYmrb2D6cpjkRd',
            _id: '628e48b78957fc7aeeaa888f',
          },
          {
            value: 1,
            cargo: ['green', 'black'],
            region: 'Central',
            uuid: 'nIeBrTUgrqa6xWtOzRJSy',
            _id: '628e48b78957fc7aeeaa8890',
          },
        ],
        coatOfArms: '',
        region: 'Central',
        _id: '628e446046c2a7caef6f1331',
      },
      column: 5,
      row: 6,
      _id: '628e446046c2a7caef6f1330',
    },
    {
      city: {
        name: 'Falsterbo',
        goods: ['black'],
        contracts: [
          {
            value: 2,
            cargo: ['green', 'brown'],
            region: 'Central',
            uuid: 'yOc5SMuESOdHwlvrdCnev',
            _id: '628e48b78957fc7aeeaa8891',
          },
          {
            value: 2,
            cargo: ['gray', 'black'],
            region: 'Central',
            uuid: 'tmjIQCXw89B04fkuMZO4t',
            _id: '628e48b78957fc7aeeaa8892',
          },
          {
            value: 1,
            cargo: ['yellow', 'blue'],
            region: 'Central',
            uuid: '2FaNBeH7R9S7Fp624rbBp',
            _id: '628e48b78957fc7aeeaa8893',
          },
        ],
        coatOfArms: '',
        region: 'Central',
        _id: '628e446046c2a7caef6f1333',
      },
      column: 6,
      row: 5,
      _id: '628e446046c2a7caef6f1332',
    },
    {
      city: {
        name: 'Stettin',
        goods: ['green', 'yellow'],
        contracts: [
          {
            value: 5,
            cargo: ['red', 'gray'],
            region: 'Central',
            uuid: 'Qmm-wjiCdGCXD8msnlzfi',
            _id: '628e48b78957fc7aeeaa8894',
          },
          {
            value: 2,
            cargo: ['brown', 'black'],
            region: 'Central',
            uuid: 'NzWBfu4aeVE6uNRwZzy9k',
            _id: '628e48b78957fc7aeeaa8895',
          },
          {
            value: 1,
            cargo: ['green', 'blue'],
            region: 'Central',
            uuid: 'vnDqyKwybnykgPVp9VrQe',
            _id: '628e48b78957fc7aeeaa8896',
          },
        ],
        coatOfArms: '',
        region: 'Central',
        _id: '628e446046c2a7caef6f1335',
      },
      column: 6,
      row: 7,
      _id: '628e446046c2a7caef6f1334',
    },
    { column: 7, row: 4, _id: '628e446046c2a7caef6f1336' },
    { column: 7, row: 6, _id: '628e446046c2a7caef6f1337' },
    {
      city: {
        name: 'Stockholm',
        goods: ['blue', 'brown'],
        contracts: [
          {
            value: 3,
            cargo: ['red', 'brown'],
            region: 'East',
            uuid: 'H_w9jdJbTRHjjxUHGkY2Z',
            _id: '628e48b78957fc7aeeaa8897',
          },
          {
            value: 5,
            cargo: ['red', 'yellow'],
            region: 'East',
            uuid: 'O-LoI3CUkKJEKTtOtsrH2',
            _id: '628e48b78957fc7aeeaa8898',
          },
          {
            value: 1,
            cargo: ['blue', 'black'],
            region: 'East',
            uuid: 'a3tlCdDsh0ijCFaL35-Tz',
            _id: '628e48b78957fc7aeeaa8899',
          },
        ],
        coatOfArms: '',
        region: 'East',
        _id: '628e446046c2a7caef6f1339',
      },
      column: 8,
      row: 1,
      _id: '628e446046c2a7caef6f1338',
    },
    {
      city: {
        name: 'Visby',
        goods: ['gray', 'black'],
        contracts: [
          {
            value: 3,
            cargo: ['red', 'blue'],
            region: 'East',
            uuid: 'o9mgf2WCvBdkFrXx5kIVE',
            _id: '628e48b78957fc7aeeaa889a',
          },
          {
            value: 3,
            cargo: ['red', 'black'],
            region: 'East',
            uuid: 'mj2-AFZ453dXp9UuQkjLF',
            _id: '628e48b78957fc7aeeaa889b',
          },
          {
            value: 2,
            cargo: ['yellow', 'black'],
            region: 'East',
            uuid: 'FN66j3NQVNHeGxXMI4-V-',
            _id: '628e48b78957fc7aeeaa889c',
          },
        ],
        coatOfArms: '',
        region: 'East',
        _id: '628e446046c2a7caef6f133b',
      },
      column: 8,
      row: 3,
      _id: '628e446046c2a7caef6f133a',
    },
    {
      city: {
        name: 'Danzig',
        goods: ['black', 'brown'],
        contracts: [
          {
            value: 2,
            cargo: ['yellow', 'blue'],
            region: 'East',
            uuid: '5VMnIL_9lqmcYFQyJhOVH',
            _id: '628e48b78957fc7aeeaa889d',
          },
          {
            value: 2,
            cargo: ['yellow', 'brown'],
            region: 'East',
            uuid: 'yKOxlG4wRvz9SrlKokEtg',
            _id: '628e48b78957fc7aeeaa889e',
          },
          {
            value: 2,
            cargo: ['green', 'black'],
            region: 'East',
            uuid: 'MxWEiMnNAs_0rKbTbpvNx',
            _id: '628e48b78957fc7aeeaa889f',
          },
        ],
        coatOfArms: '',
        region: 'East',
        _id: '628e446046c2a7caef6f133d',
      },
      column: 8,
      row: 5,
      _id: '628e446046c2a7caef6f133c',
    },
    {
      city: {
        name: 'Åbo',
        goods: ['black', 'black'],
        contracts: [
          {
            value: 2,
            cargo: ['gray', 'green'],
            region: 'East',
            uuid: 'DTPb43DwgS8rJL96FE61A',
            _id: '628e48b78957fc7aeeaa88a0',
          },
          {
            value: 1,
            cargo: ['gray', 'blue'],
            region: 'East',
            uuid: 'TBWN6E95QRRlt1zNApqup',
            _id: '628e48b78957fc7aeeaa88a1',
          },
          {
            value: 5,
            cargo: ['red', 'green'],
            region: 'East',
            uuid: 'VNuedVzaCpivrJwhcdC8v',
            _id: '628e48b78957fc7aeeaa88a2',
          },
        ],
        coatOfArms: '',
        region: 'East',
        _id: '628e446046c2a7caef6f133f',
      },
      column: 9,
      row: 0,
      _id: '628e446046c2a7caef6f133e',
    },
    { column: 9, row: 2, _id: '628e446046c2a7caef6f1340' },
    { column: 9, row: 4, _id: '628e446046c2a7caef6f1341' },
    { column: 10, row: 1, _id: '628e446046c2a7caef6f1342' },
    {
      city: {
        name: 'Riga',
        goods: ['blue', 'blue'],
        contracts: [
          {
            value: 3,
            cargo: ['yellow', 'green'],
            region: 'East',
            uuid: 'BhL_UCzs6RsQpDbsZDakr',
            _id: '628e48b78957fc7aeeaa88a3',
          },
          {
            value: 3,
            cargo: ['red', 'gray'],
            region: 'East',
            uuid: 'kXVWQmMKjrSNsx6Ya7Ez-',
            _id: '628e48b78957fc7aeeaa88a4',
          },
          {
            value: 2,
            cargo: ['yellow', 'gray'],
            region: 'East',
            uuid: '3jwOJ4isiMBAwMAo0E-xG',
            _id: '628e48b78957fc7aeeaa88a5',
          },
        ],
        coatOfArms: '',
        region: 'East',
        _id: '628e446046c2a7caef6f1344',
      },
      column: 10,
      row: 3,
      _id: '628e446046c2a7caef6f1343',
    },
    {
      city: {
        name: 'Reval',
        goods: ['gray', 'gray'],
        contracts: [
          {
            value: 2,
            cargo: ['green', 'blue'],
            region: 'East',
            uuid: 'Ji9d3_uPB6vPBYVZsAHXA',
            _id: '628e48b78957fc7aeeaa88a6',
          },
          {
            value: 1,
            cargo: ['gray', 'brown'],
            region: 'East',
            uuid: 'j2GQ2vnLvgAn4mWGzKHlZ',
            _id: '628e48b78957fc7aeeaa88a7',
          },
          {
            value: 2,
            cargo: ['green', 'brown'],
            region: 'East',
            uuid: '7vu7ZBo1915Gf6-J--yN-',
            _id: '628e48b78957fc7aeeaa88a8',
          },
        ],
        coatOfArms: '',
        region: 'East',
        _id: '628e446046c2a7caef6f1346',
      },
      column: 11,
      row: 0,
      _id: '628e446046c2a7caef6f1345',
    },
  ],
  achievements: [
    { name: 'Diversifier A', value: 4, _id: '628e48b78957fc7aeeaa88a9' },
    { name: 'Explorer A', value: 4, _id: '628e48b78957fc7aeeaa88aa' },
    { name: 'Merchant B', value: 4, _id: '628e48b78957fc7aeeaa88ab' },
    { name: 'Specialist B', value: 4, _id: '628e48b78957fc7aeeaa88ac' },
    { name: 'Monopolist B', value: 3, _id: '628e48b78957fc7aeeaa88ad' },
    { name: 'Banker B', value: 3, _id: '628e48b78957fc7aeeaa88ae' },
  ],
  __v: 0,
};

export const MOCK_SESSIONS_5: ISession[] = [
  {
    user: {
      name: 'Jan Johanssen',
      uuid: 'q1VmykgjMt3gcpvXvGyIR',
      connected: true,
    },
    activeGameUuid: 'UeeJKwv2qT_PcUbWA2Iuv',
    uuid: '5votv_e29QET6B2RgPnnd',
    email: 'guest@guest.com',
  },
  {
    user: { name: 'Person2', uuid: '8YNzwnOSPAAEAwK9bHdYy', connected: true },
    activeGameUuid: 'UeeJKwv2qT_PcUbWA2Iuv',
    uuid: 'U8y95tvEFTfnlzC06OT9-',
    email: 'person2@mock.now',
  },
  {
    user: { name: 'Person3', uuid: 'Vr2LJteMKXN6RAS5Ae8qs', connected: true },
    activeGameUuid: 'UeeJKwv2qT_PcUbWA2Iuv',
    uuid: 'SF9s41WrXTqu6XqTBrfx9',
    email: 'person3@mock.now',
  },
  {
    user: { name: 'Person5', uuid: 'WjDMXFE9z1WqHxY7P7fv7', connected: true },
    activeGameUuid: 'UeeJKwv2qT_PcUbWA2Iuv',
    uuid: 'o17NNh1E7kPrYWoaTgI8r',
    email: 'person5@mock.now',
  },
  {
    user: { name: 'Person5', uuid: 'WjDMXFE9z1WqHxY7P7fv7', connected: true },
    activeGameUuid: 'UeeJKwv2qT_PcUbWA2Iuv',
    uuid: 'o17NNh1E7kPrYWoaTgI8r',
    email: 'person5@mock.now',
  },
];
