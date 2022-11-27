import { IContract, TCargo } from '../../../shared/types';

export const createContractUuid = (contract: IContract): string => {
  const parseColor = (cargo: TCargo): string => {
    switch (cargo) {
      case 'black':
        return 'bla';
        break;
      case 'blue':
        return 'blu';
        break;
      case 'brown':
        return 'bro';
        break;
      case 'gray':
        return 'gry';
        break;
      case 'green':
        return 'grn';
        break;
      case 'red':
        return 'red';
        break;
      case 'yellow':
        return 'yel';
        break;
    }
  };

  const newUuid =
    contract.region[0] +
    '_' +
    parseColor(contract.cargo[0]) +
    '_' +
    parseColor(contract.cargo[1]) +
    '_' +
    contract.value.toString();

  return newUuid;
};
