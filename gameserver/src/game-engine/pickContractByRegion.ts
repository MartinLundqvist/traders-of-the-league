/**
 * We receive the contract array and a region as variables,
 * return the first contract that matches the region,
 * and mutate the contract array to remove that contract
 */

import { IContract, TRegion } from '../../../shared/types';

export const pickContractByRegion = (
  contracts: IContract[],
  region: TRegion
): IContract => {
  const contractId = contracts.findIndex(
    (contract) => contract.region === region
  );
  const result = contracts[contractId];
  contracts.splice(contractId, 1);
  return result;
};
