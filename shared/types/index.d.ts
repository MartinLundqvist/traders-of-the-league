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

export type TVictoryPoint = 1 | 2 | 3 | 4 | 5;

export type TCoatOfArms = string;

export type TRegion = 'East' | 'West' | 'Central';

export interface IContract {
  value: TVictoryPoint;
  cargo: TCargo[];
  region: TRegion;
}

export interface IEmptiedCity {
  name: TCity;
  value: TVictoryPoint;
}

export interface IAchievement {
  name: string;
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
}

export interface IGame {
  name: string;
  uuid: string;
  players: IPlayer[];
  board: TBoard;
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
