import { IPlayer, TCargo } from '../../../shared/types';
import { cargoColors } from './constants';

/**
 * Contracts of each color. Does not need to be 7 different contracts
 */
export const progressionDiversifierA = (player: IPlayer): number => {
  // Create a flat array of the cargo colors collected
  let cargo: TCargo[] = [];
  player.contractsFulfilled.forEach((contract) => {
    cargo = [...cargo, ...contract.cargo];
  });

  //Turn into a unique set
  let cargoSet = new Set(cargo);

  //   console.log(cargoSet);

  return cargoSet.size;

  // //Got all of 'em?
  // if (cargoSet.size === CARGO_COLORS) return true;

  // return false;
};

/**
 * Contracts with 2 red, 2 yellow, 2 grey colors, need not be 6 different contracts.
 */
export const progressionDiversifierB = (player: IPlayer): number => {
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

  let progress = 0;

  // Got at least two of each?
  nrRed <= 2 ? (progress += nrRed) : (progress += 2);
  nrYellow <= 2 ? (progress += nrYellow) : (progress += 2);
  nrGray <= 2 ? (progress += nrGray) : (progress += 2);

  return progress;

  // // Got at least two of each?
  // if (nrRed >= 2 && nrYellow >= 2 && nrGray >= 2) return true;

  // return false;
};

/**
 * 5 Central contracts.
 */
export const progressionRegionalTraderA = (player: IPlayer): number => {
  let centralContracts = player.contractsFulfilled.filter(
    (contract) => contract.region === 'Central'
  );

  //   console.log(centralContracts);

  return centralContracts.length;
};

/**
 * 4 Western contracts
 */
export const progressionRegionalTraderB = (player: IPlayer): number => {
  let westernContracts = player.contractsFulfilled.filter(
    (contract) => contract.region === 'West'
  );

  //   console.log(westernContracts);

  return westernContracts.length;
};

/**
 * 7 contracts of one color
 */
export const progressionMonopolistA = (player: IPlayer): number => {
  // Create an array with nr of contracts for each each color
  let nrContractsByColor = cargoColors.map((color) => {
    let contractsWithColor = player.contractsFulfilled.filter((contract) =>
      contract.cargo.includes(color)
    );
    return { color, count: contractsWithColor.length };
  });

  // Sort by count
  nrContractsByColor.sort((a, b) => b.count - a.count);

  return nrContractsByColor[0].count;

  // // Is there any entry in the array with >= 7 contracts?
  // let moreThan7 = nrContractsByColor.find((entry) => entry.count >= 7);

  // //   console.log(nrContractsByColor);

  // if (moreThan7) return true;

  // return false;
};

/**
 * 6 contracts of one color
 */
export const progressionMonopolistB = (player: IPlayer): number => {
  // Create an array with nr of contracts for each each color
  let nrContractsByColor = cargoColors.map((color) => {
    let contractsWithColor = player.contractsFulfilled.filter((contract) =>
      contract.cargo.includes(color)
    );
    return { color, count: contractsWithColor.length };
  });

  // Sort by count
  nrContractsByColor.sort((a, b) => b.count - a.count);

  return nrContractsByColor[0].count;

  // // Is there any entry in the array with >= 6 contracts?
  // let moreThan6 = nrContractsByColor.find((entry) => entry.count >= 6);

  // //   console.log(nrContractsByColor);

  // if (moreThan6) return true;

  // return false;
};

/**
 * 2 contracts from each region West, Central and East
 */
export const progressionExplorerA = (player: IPlayer): number => {
  let contractsFromWest = player.contractsFulfilled.filter(
    (contract) => contract.region === 'West'
  );

  let contractsFromEast = player.contractsFulfilled.filter(
    (contract) => contract.region === 'East'
  );

  let contractsFromCentral = player.contractsFulfilled.filter(
    (contract) => contract.region === 'Central'
  );

  let nrWest = contractsFromWest.length;
  let nrCentral = contractsFromCentral.length;
  let nrEast = contractsFromEast.length;

  let progress = 0;

  // Got at least two of each?
  nrWest <= 2 ? (progress += nrWest) : (progress += 2);
  nrCentral <= 2 ? (progress += nrCentral) : (progress += 2);
  nrEast <= 2 ? (progress += nrEast) : (progress += 2);

  return progress;

  // let nrContractsByRegion = regions.map((region) => {
  //   let contractsFromRegion = player.contractsFulfilled.filter(
  //     (contract) => contract.region === region
  //   );
  //   return { region, count: contractsFromRegion.length };
  // });

  // Do all entries in the array have >= 2 contracts?
  // let moreThan2 = nrContractsByRegion.every((entry) => entry.count >= 2);

  //   console.log(nrContractsByRegion);

  // if (moreThan2) return true;

  // return false;
};
/**
 * 1 contract from each region West, Central and East
 */
export const progressionExplorerB = (player: IPlayer): number => {
  let contractsFromWest = player.contractsFulfilled.filter(
    (contract) => contract.region === 'West'
  );

  let contractsFromEast = player.contractsFulfilled.filter(
    (contract) => contract.region === 'East'
  );

  let contractsFromCentral = player.contractsFulfilled.filter(
    (contract) => contract.region === 'Central'
  );

  let nrWest = contractsFromWest.length;
  let nrCentral = contractsFromCentral.length;
  let nrEast = contractsFromEast.length;

  let progress = 0;

  // Got at least two of each?
  nrWest <= 1 ? (progress += nrWest) : (progress += 1);
  nrCentral <= 1 ? (progress += nrCentral) : (progress += 1);
  nrEast <= 1 ? (progress += nrEast) : (progress += 1);

  return progress;

  // // Create an array with nr of contracts for each each color
  // let nrContractsByRegion = regions.map((region) => {
  //   let contractsFromRegion = player.contractsFulfilled.filter(
  //     (contract) => contract.region === region
  //   );
  //   return { region, count: contractsFromRegion.length };
  // });

  // // Do all entries in the array have >= 1 contracts?
  // let moreThan1 = nrContractsByRegion.every((entry) => entry.count >= 1);

  // //   console.log(nrContractsByRegion);

  // if (moreThan1) return true;

  // return false;
};

/**
 * 3 empty city tiles
 */
export const progressionSupplierA = (player: IPlayer): number => {
  return player.citiesEmptied.length;

  // let nrEmptyTiles = player.citiesEmptied.length;

  // if (nrEmptyTiles >= 3) return true;

  // return false;
};

/**
 * 2 empty city tiles
 */
export const progressionSupplierB = (player: IPlayer): number => {
  return player.citiesEmptied.length;

  // let nrEmptyTiles = player.citiesEmptied.length;

  // if (nrEmptyTiles >= 2) return true;

  // return false;
};

/**
 * 4 blue contracts
 */
export const progressionSpecialistA = (player: IPlayer): number => {
  let nrBlueContracts =
    player.contractsFulfilled.filter((contract) =>
      contract.cargo.includes('blue')
    ).length || 0;

  return nrBlueContracts;

  // if (nrBlueContracts >= 4) return true;

  // return false;
};

/**
 * 4 green contracts
 */
export const progressionSpecialistB = (player: IPlayer): number => {
  let nrGreenContracts =
    player.contractsFulfilled.filter((contract) =>
      contract.cargo.includes('green')
    ).length || 0;

  return nrGreenContracts;

  // if (nrGreenContracts >= 4) return true;

  // return false;
};

/**
 * 6 contracts worth 1 VP
 */
export const progressionMerchantA = (player: IPlayer): number => {
  let nrContractsWorth1 =
    player.contractsFulfilled.filter((contract) => contract.value === 1)
      .length || 0;

  return nrContractsWorth1;
  //   console.log(
  //     player.contractsFulfilled.filter((contract) => contract.value === 1)
  //   );

  // if (nrContractsWorth1 >= 6) return true;

  // return false;
};

/**
 * 7 contracts worth 1 or 2 VPs
 */
export const progressionMerchantB = (player: IPlayer): number => {
  let nrContractsWorth1Or2 =
    player.contractsFulfilled.filter(
      (contract) => contract.value === 1 || contract.value === 2
    ).length || 0;

  //   console.log(
  //     player.contractsFulfilled.filter(
  //       (contract) => contract.value === 1 || contract.value === 2
  //     )
  //   );

  return nrContractsWorth1Or2;

  // if (nrContractsWorth1Or2 >= 7) return true;

  // return false;
};

/**
 * 4 contracts worth 3 VP
 */
export const progressionBankerA = (player: IPlayer): number => {
  let nrContractsWorth3 =
    player.contractsFulfilled.filter((contract) => contract.value === 3)
      .length || 0;

  //   console.log(
  //     player.contractsFulfilled.filter((contract) => contract.value === 3)
  //   );

  return nrContractsWorth3;

  // if (nrContractsWorth3 >= 4) return true;

  // return false;
};
/**
 * 4 contracts worth 3 or 5 VPs
 */
export const progressionBankerB = (player: IPlayer): number => {
  let nrContractsWorth3Or5 =
    player.contractsFulfilled.filter(
      (contract) => contract.value === 3 || contract.value === 5
    ).length || 0;

  return nrContractsWorth3Or5;

  //   console.log(
  //     player.contractsFulfilled.filter(
  //       (contract) => contract.value === 3 || contract.value === 5
  //     )
  //   );

  // if (nrContractsWorth3Or5 >= 4) return true;

  // return false;
};
