export * from './socketContracts';

export type TCargo =
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'brown'
  | 'gray'
  | 'black';

export type TPlayerColor = 'red' | 'green' | 'yellow' | 'blue' | 'black';

export type TCity =
  | 'London'
  | 'Newcastle'
  | 'Bergen'
  | 'Hamburg'
  | 'Brügge'
  | 'Tønsberg'
  | 'Falsterbo'
  | 'Lübeck'
  | 'Stettin'
  | 'Danzig'
  | 'Visby'
  | 'Stockholm'
  | 'Åbo'
  | 'Riga'
  | 'Reval';

export type TVictoryPoint = 0 | 1 | 2 | 3 | 4 | 5;

export type TCoatOfArms = string;

export type TRegion = 'East' | 'West' | 'Central';

export interface IContract {
  value: TVictoryPoint;
  cargo: TCargo[];
  region: TRegion;
  uuid: string;
  _id?: string;
}

export interface IEmptiedCity {
  name: TCity;
  value: TVictoryPoint;
}

export type TAchievement =
  | 'Diversifier A'
  | 'Diversifier B'
  | 'Regional Trader A'
  | 'Regional Trader B'
  | 'Monopolist A'
  | 'Monopolist B'
  | 'Explorer A'
  | 'Explorer B'
  | 'Supplier A'
  | 'Supplier B'
  | 'Specialist A'
  | 'Specialist B'
  | 'Merchant A'
  | 'Merchant B'
  | 'Banker A'
  | 'Banker B';

export interface IAchievement {
  name: TAchievement;
  value: TVictoryPoint;
  _id?: string;
}

export interface IAchievementProgress {
  achievementName: TAchievement;
  target: number; // This is the number of "things" that must have been completed (i.e., emptying x cities or taking one contract of each color etc.)
  progress: number; // This is the number of such things currently completed.
}

export interface ICity {
  name: TCity;
  goods: TCargo[];
  contracts: IContract[];
  coatOfArms: TCoatOfArms;
  region: TRegion;
  _id?: string;
}

export interface IBoardPosition {
  column: number;
  row: number;
  _id?: string;
}

export interface IBoardHexagon extends IBoardPosition {
  city?: ICity;
}

export type TBoard = IBoardHexagon[];

export interface IPlayer {
  color: TPlayerColor;
  user: IUser;
  contractsFulfilled: IContract[];
  citiesEmptied: IEmptiedCity[];
  achievements: IAchievement[];
  achievementsProgress: IAchievementProgress[];
  position: IBoardPosition;
  victoryPoints: number;
  cargo: TCargo[];
  hasMadeEndGameMove: boolean;
  _id?: string;
}

export type TGameStatus =
  | 'waiting'
  | 'playing'
  | 'endgame'
  | 'won'
  | 'terminated';

export type TMoves = 'sail' | 'load' | 'trade' | 'achieve';

export interface IGameState {
  status: TGameStatus; // What status it the game in?
  round: number; // Current round
  currentRound: {
    // UUID of the current player as well as how many moves they have left on this round.
    playerUuid: string;
    // Player gets TWO moves
    movesLeft: number;
    // Cannot repeat moves, so we need to record them
    movesAvailable: TMoves[];
    // We want to allow user to see which hexes they can currently reach
    hexesWithinRange: IBoardPosition[];
    // After the moves have been done, achievements are to be picked
    achievementsEarned: IAchievement[];
  };
  numberOfCitiesEmptied: number;
}

export interface IGame {
  name: string;
  uuid: string;
  players: IPlayer[];
  numberOfCitiesToEmpty: number;
  board: TBoard;
  state: IGameState;
  achievements: IAchievement[];
  startTime: number; // In Epoch ms
  endTime: number; // In Epoch ms
  _id?: string;
  __v?: number;
}

export interface IUser {
  name: string;
  uuid: string;
  connected: boolean;
}

export interface ISession {
  uuid: string;
  user: IUser;
  email: string;
  activeGameUuid: string;
}

export interface IPlayerStats {
  uuid: string;
  name: string;
  rank: number;
  victoryPoints: number;
  nrContractsFulfilled: number;
}

export interface IGameResults {
  game: IGame;
  playerStats: IPlayerStats[];
  tie: boolean;
}

export interface IMessage {
  uuid: string;
  from: IUser;
  message: string;
}

export interface IChat {
  gameUuid: string;
  messages: IMessage[];
}

export type TPriority = 'Low' | 'Medium' | 'High';

export interface IBugReport {
  date: Date;
  email: string; // User email
  userReport: {
    action: string;
    bug: string;
    expectation: string;
    priority: TPriority;
  };
  game: IGame;
}

export interface IActiveGame {
  name: string;
  uuid: string;
  players: IPlayer[];
}
