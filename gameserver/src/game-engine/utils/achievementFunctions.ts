import {
  IAchievement,
  IPlayer,
  TAchievedTargets,
  TCargo,
  TRegion,
  TTargetType,
} from '../../../../shared/types';

export type TProgressionValues = number | TCargo | TRegion;

export type TProgressionFunction = (
  player: IPlayer,
  values: TProgressionValues[]
) => { achievement: number[]; achievedTargets: TAchievedTargets };

export interface IAchievementInner extends IAchievement {
  nrPlayers: number[]; // specifies the [min, max] number of players the achievement is valid for
  side: 'A' | 'B'; // indicates which side of the "card"
  progressionFn: TProgressionFunction; // The progression rule
  progressionArg: TProgressionValues[];
  targetFn: (array: number[]) => number; // The method for transforming the progression into a target value
  targetType: TTargetType;
}

export const countNrContractsVP: TProgressionFunction = (player, values) => {
  const achievement = new Array<number>(values.length);
  achievement.fill(0);
  const achievedTargets: TAchievedTargets = { contracts: [] };

  player.contractsFulfilled.forEach((contract) => {
    // Is the contract of one of the values we are looking for?
    let foundIndex = values.findIndex((value) => value === contract.value);

    if (foundIndex > -1) {
      achievement[foundIndex] += 1;
      achievedTargets.contracts!.push(contract);
    }
  });

  return { achievement, achievedTargets };
};

export const countNrCargoColor: TProgressionFunction = (player, values) => {
  const achievement = new Array<number>(values.length);
  achievement.fill(0);
  const achievedTargets: TAchievedTargets = { cargo: [] };

  const playerCargo: TCargo[] = [];
  for (const contract of player.contractsFulfilled) {
    playerCargo.push(contract.cargo[0]);
    playerCargo.push(contract.cargo[1]);
  }

  values.forEach((value, index) => {
    // const filtered = playerCargo.find((cargo) => cargo === value);
    const filtered = playerCargo.filter((cargo) => cargo === value);
    if (filtered && filtered.length > 0) {
      achievedTargets.cargo!.push(...filtered);
    }
    achievement[index] = filtered ? filtered.length : 0;
  });

  return { achievement, achievedTargets };
};

export const countNrContractsColor: TProgressionFunction = (player, values) => {
  const achievement = new Array<number>(values.length);
  achievement.fill(0);

  const achievedTargets: TAchievedTargets = { contracts: [] };

  player.contractsFulfilled.forEach((contract) => {
    let addContract = false;

    // Does the contract contain one cargo of the values we are looking for?
    let foundIndex = values.findIndex((value) => value === contract.cargo[0]);

    if (foundIndex > -1) {
      addContract = true;
      achievement[foundIndex] += 1;
    }

    foundIndex = values.findIndex((value) => value === contract.cargo[1]);

    if (foundIndex > -1) {
      addContract = true;
      achievement[foundIndex] += 1;
    }

    if (addContract) {
      achievedTargets.contracts!.push(contract);
    }
  });

  console.log(
    `For player ${player.user.name} the achievement is:`,
    values,
    achievement
  );

  return { achievement, achievedTargets };
};
export const countNrContractsRegion: TProgressionFunction = (
  player,
  values
) => {
  const achievement = new Array<number>(values.length);
  achievement.fill(0);

  const achievedTargets: TAchievedTargets = { contracts: [] };

  player.contractsFulfilled.forEach((contract) => {
    // Does the contract region come the values we are looking for?
    let foundIndex = values.findIndex((value) => value === contract.region);

    if (foundIndex > -1) {
      achievement[foundIndex] += 1;
      achievedTargets.contracts!.push(contract);
    }
  });

  return { achievement, achievedTargets };
};

export const countNrCitiesEmptied: TProgressionFunction = (player, values) => {
  const achievement = [player.citiesEmptied.length];
  const achievedTargets: TAchievedTargets = {
    cities: [...player.citiesEmptied],
  };

  return { achievement, achievedTargets };
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
