import { IPlayer, TCargo } from '../../../shared/types';
import { cargoColors, CARGO_COLORS, regions } from './constants';

/**
 * Contracts of each color. Does not need to be 7 different contracts
 */
export const hasEarnedDiversifierA = (player: IPlayer): boolean => {
  // Create a flat array of the cargo colors collected
  let cargo: TCargo[] = [];
  player.contractsFulfilled.forEach((contract) => {
    cargo = [...cargo, ...contract.cargo];
  });

  //Turn into a unique set
  let cargoSet = new Set(cargo);

  //   console.log(cargoSet);

  //Got all of 'em?
  if (cargoSet.size === CARGO_COLORS) return true;

  return false;
};

/**
 * Contracts with 2 red, 2 yellow, 2 grey colors, need not be 6 different contracts.
 */
export const hasEarnedDiversifierB = (player: IPlayer): boolean => {
  // Create a flat array of the cargo colors collected
  let cargo: TCargo[] = [];
  player.contractsFulfilled.forEach((contract) => {
    cargo = [...cargo, ...contract.cargo];
  });

  let nrRed = cargo.filter((color) => color === 'red').length;
  let nrYellow = cargo.filter((color) => color === 'yellow').length;
  let nrGray = cargo.filter((color) => color === 'gray').length;

  //   console.log('nrRed' + nrRed);
  //   console.log('nrYellow' + nrYellow);
  //   console.log('nrGray' + nrGray);
  //   console.log(cargo);

  //Got at least two of each?
  if (nrRed >= 2 && nrYellow >= 2 && nrGray >= 2) return true;

  return false;
};

/**
 * 5 Central contracts.
 */
export const hasEarnedRegionalTraderA = (player: IPlayer): boolean => {
  let centralContracts = player.contractsFulfilled.filter(
    (contract) => contract.region === 'Central'
  );

  //   console.log(centralContracts);

  if (centralContracts.length >= 5) return true;

  return false;
};

/**
 * 4 Western contracts
 */
export const hasEarnedRegionalTraderB = (player: IPlayer): boolean => {
  let westernContracts = player.contractsFulfilled.filter(
    (contract) => contract.region === 'West'
  );

  //   console.log(westernContracts);

  if (westernContracts.length >= 4) return true;

  return false;
};

/**
 * 7 contracts of one color
 */
export const hasEarnedMonopolistA = (player: IPlayer): boolean => {
  // Create an array with nr of contracts for each each color
  let nrContractsByColor = cargoColors.map((color) => {
    let contractsWithColor = player.contractsFulfilled.filter((contract) =>
      contract.cargo.includes(color)
    );
    return { color, count: contractsWithColor.length };
  });

  // Is there any entry in the array with >= 7 contracts?
  let moreThan7 = nrContractsByColor.find((entry) => entry.count >= 7);

  //   console.log(nrContractsByColor);

  if (moreThan7) return true;

  return false;
};

/**
 * 6 contracts of one color
 */
export const hasEarnedMonopolistB = (player: IPlayer): boolean => {
  // Create an array with nr of contracts for each each color
  let nrContractsByColor = cargoColors.map((color) => {
    let contractsWithColor = player.contractsFulfilled.filter((contract) =>
      contract.cargo.includes(color)
    );
    return { color, count: contractsWithColor.length };
  });

  // Is there any entry in the array with >= 6 contracts?
  let moreThan6 = nrContractsByColor.find((entry) => entry.count >= 6);

  //   console.log(nrContractsByColor);

  if (moreThan6) return true;

  return false;
};

/**
 * 2 contracts from each region West, Central and East
 */
export const hasEarnedExplorerA = (player: IPlayer): boolean => {
  // Create an array with nr of contracts for each each color
  let nrContractsByRegion = regions.map((region) => {
    let contractsFromRegion = player.contractsFulfilled.filter(
      (contract) => contract.region === region
    );
    return { region, count: contractsFromRegion.length };
  });

  // Do all entries in the array have >= 2 contracts?
  let moreThan2 = nrContractsByRegion.every((entry) => entry.count >= 2);

  //   console.log(nrContractsByRegion);

  if (moreThan2) return true;

  return false;
};
/**
 * 1 contract from each region West, Central and East
 */
export const hasEarnedExplorerB = (player: IPlayer): boolean => {
  // Create an array with nr of contracts for each each color
  let nrContractsByRegion = regions.map((region) => {
    let contractsFromRegion = player.contractsFulfilled.filter(
      (contract) => contract.region === region
    );
    return { region, count: contractsFromRegion.length };
  });

  // Do all entries in the array have >= 1 contracts?
  let moreThan1 = nrContractsByRegion.every((entry) => entry.count >= 1);

  //   console.log(nrContractsByRegion);

  if (moreThan1) return true;

  return false;
};

/**
 * 3 empty city tiles
 */
export const hasEarnedSupplierA = (player: IPlayer): boolean => {
  let nrEmptyTiles = player.citiesEmptied.length;

  if (nrEmptyTiles >= 3) return true;

  return false;
};

/**
 * 2 empty city tiles
 */
export const hasEarnedSupplierB = (player: IPlayer): boolean => {
  let nrEmptyTiles = player.citiesEmptied.length;

  if (nrEmptyTiles >= 2) return true;

  return false;
};

/**
 * 4 blue contracts
 */
export const hasEarnedSpecialistA = (player: IPlayer): boolean => {
  let nrBlueContracts =
    player.contractsFulfilled.filter((contract) =>
      contract.cargo.includes('blue')
    ).length || 0;

  if (nrBlueContracts >= 4) return true;

  return false;
};

/**
 * 4 green contracts
 */
export const hasEarnedSpecialistB = (player: IPlayer): boolean => {
  let nrGreenContracts =
    player.contractsFulfilled.filter((contract) =>
      contract.cargo.includes('green')
    ).length || 0;

  if (nrGreenContracts >= 4) return true;

  return false;
};

/**
 * 6 contracts worth 1 VP
 */
export const hasEarnedMerchantA = (player: IPlayer): boolean => {
  let nrContractsWorth1 =
    player.contractsFulfilled.filter((contract) => contract.value === 1)
      .length || 0;

  //   console.log(
  //     player.contractsFulfilled.filter((contract) => contract.value === 1)
  //   );

  if (nrContractsWorth1 >= 6) return true;

  return false;
};

/**
 * 7 contracts worth 1 or 2 VPs
 */
export const hasEarnedMerchantB = (player: IPlayer): boolean => {
  let nrContractsWorth1Or2 =
    player.contractsFulfilled.filter(
      (contract) => contract.value === 1 || contract.value === 2
    ).length || 0;

  //   console.log(
  //     player.contractsFulfilled.filter(
  //       (contract) => contract.value === 1 || contract.value === 2
  //     )
  //   );

  if (nrContractsWorth1Or2 >= 7) return true;

  return false;
};

/**
 * 4 contracts worth 3 VP
 */
export const hasEarnedBankerA = (player: IPlayer): boolean => {
  let nrContractsWorth3 =
    player.contractsFulfilled.filter((contract) => contract.value === 3)
      .length || 0;

  //   console.log(
  //     player.contractsFulfilled.filter((contract) => contract.value === 3)
  //   );

  if (nrContractsWorth3 >= 4) return true;

  return false;
};
/**
 * 4 contracts worth 3 or 5 VPs
 */
export const hasEarnedBankerB = (player: IPlayer): boolean => {
  let nrContractsWorth3Or5 =
    player.contractsFulfilled.filter(
      (contract) => contract.value === 3 || contract.value === 5
    ).length || 0;

  //   console.log(
  //     player.contractsFulfilled.filter(
  //       (contract) => contract.value === 3 || contract.value === 5
  //     )
  //   );

  if (nrContractsWorth3Or5 >= 4) return true;

  return false;
};
