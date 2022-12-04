import {
  IAchievement,
  IPlayer,
  TCargo,
  TRegion,
} from '../../../../shared/types';

export type TProgressionValues = number | TCargo | TRegion;

export interface IAchievementInner extends IAchievement {
  nrPlayers: number[]; // specifies the [min, max] number of players the achievement is valid for
  side: 'A' | 'B'; // indicates which side of the "card"
  progressionFn: (player: IPlayer, values: TProgressionValues[]) => number[]; // The progression rule
  progressionArg: TProgressionValues[];
  targetFn: (array: number[]) => number; // The method for transforming the progression into a target value
}

export const countNrContractsVP = (
  player: IPlayer,
  values: TProgressionValues[]
): number[] => {
  const result = new Array<number>(values.length);
  result.fill(0);

  player.contractsFulfilled.forEach((contract) => {
    // Is the contract of one of the values we are looking for?
    let foundIndex = values.findIndex((value) => value === contract.value);

    if (foundIndex > -1) {
      result[foundIndex] += 1;
    }
  });

  return result;
};

export const countNrCargoColor = (
  player: IPlayer,
  values: TProgressionValues[]
): number[] => {
  const result = new Array<number>(values.length);
  result.fill(0);

  const playerCargo: TCargo[] = [];
  for (const contract of player.contractsFulfilled) {
    playerCargo.push(contract.cargo[0]);
    playerCargo.push(contract.cargo[1]);
  }

  values.forEach((value, index) => {
    const filtered = playerCargo.find((cargo) => cargo === value) || [];
    result[index] = filtered.length;
  });

  return result;
};

export const countNrContractsColor = (
  player: IPlayer,
  values: TProgressionValues[]
): number[] => {
  const result = new Array<number>(values.length);
  result.fill(0);

  player.contractsFulfilled.forEach((contract) => {
    // Does the contract contain one cargo of the values we are looking for?
    let foundIndex = values.findIndex(
      (value) => value === contract.cargo[0] || value === contract.cargo[1]
    );

    if (foundIndex > -1) {
      console.log(
        'Found a contract with color ' +
          values[foundIndex] +
          ' in contract ' +
          contract.uuid
      );
      result[foundIndex] += 1;
    }
  });

  return result;
};
export const countNrContractsRegion = (
  player: IPlayer,
  values: TProgressionValues[]
): number[] => {
  const result = new Array<number>(values.length);
  result.fill(0);
  player.contractsFulfilled.forEach((contract) => {
    // Does the contract region come the values we are looking for?
    let foundIndex = values.findIndex((value) => value === contract.region);

    if (foundIndex > -1) {
      result[foundIndex] += 1;
    }
  });

  return result;
};

export const countNrCitiesEmptied = (
  player: IPlayer,
  values: TProgressionValues[]
): number[] => {
  return [player.citiesEmptied.length];
};

export const sumItems = (array: number[]): number =>
  array.reduce((sum, item) => sum + item, 0);

export const maxItem = (array: number[]): number =>
  [...array].sort((a, b) => b - a)[0];

const sumItemsMoreThanInner = (array: number[], x: number): number =>
  array.reduce((sum, item) => (item >= x ? (sum += x) : (sum += item)), 0);

export const sumItemsMoreThan = [
  (array: number[]) => sumItemsMoreThanInner(array, 0),
  (array: number[]) => sumItemsMoreThanInner(array, 1),
  (array: number[]) => sumItemsMoreThanInner(array, 2),
  (array: number[]) => sumItemsMoreThanInner(array, 3),
  (array: number[]) => sumItemsMoreThanInner(array, 4),
  (array: number[]) => sumItemsMoreThanInner(array, 5),
];
