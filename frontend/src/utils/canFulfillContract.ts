import { ICity, IContract, IPlayer, TCargo } from '../../../shared/types';

export const canFulfillContract = (
  player: IPlayer,
  city: ICity,
  contract: IContract
): boolean => {
  // Then check if it can be fulfilled
  const hasCargo = (cargo: TCargo): boolean => {
    return city.goods.includes(cargo) || player.cargo.includes(cargo);
  };

  return hasCargo(contract.cargo[0]) && hasCargo(contract.cargo[1]);
};

export const canFulFillSomeContract = (
  player: IPlayer | null,
  city: ICity | null
): boolean => {
  if (!player || !city) return false;

  if (city.contracts.length === 0) return false;

  return city.contracts.some((contract) =>
    canFulfillContract(player, city, contract)
  );
};
