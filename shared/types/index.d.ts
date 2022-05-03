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
}

export interface ICity {
  name: TCity;
  goods: TCargo[];
  contracts: IContract[];
  coatOfArms: TCoatOfArms;
  region: TRegion;
}

export interface IBoardPosition {
  column: number;
  row: number;
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
  position: IBoardPosition;
  victoryPoints: number;
  cargo: TCargo[];
  hasMadeEndGameMove: boolean;
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
}

export interface IUser {
  name: string;
  uuid: string;
  connected: boolean;
}

export interface ISession {
  uuid: string;
  user: IUser;
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
