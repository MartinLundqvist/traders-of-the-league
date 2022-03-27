export type TCargo =
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'brown'
  | 'gray'
  | 'black';

export type TCity =
  | 'London'
  | 'Newcastle'
  | 'Bergen'
  | 'Hamburg'
  | 'Brügge'
  | 'Tonsberg'
  | 'Falsterbo'
  | 'Lübeck'
  | 'Stettin'
  | 'Danzig'
  | 'Visby'
  | 'Stockholm'
  | 'Åbo'
  | 'Riga'
  | 'Reval';

export type TCoatOfArms = string;

export type TRegion = 'East' | 'West' | 'Central';

export interface IContract {
  value: number;
  cargo: TCargo[];
  region: TRegion;
}

export interface ICity {
  name: TCity;
  goods: TCargo[];
  contracts: IContract[];
  coatOfArms: TCoatOfArms;
  region: TRegion;
}
