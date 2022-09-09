import { IContract } from '../../../shared/types';
import { CONTRACTS } from './constants';

/**
 * A contract is characterized by
 * - 1-5 VPs
 * - A combination of two colors (7 colors in total), always two different colors
 * - A region of belonging, three in total
 */
export const createNewContracts = (): IContract[] => {
  const results: IContract[] = [...CONTRACTS];

  // Randomize the array (using Fisher-Yates algorithm)
  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = results[i];
    results[i] = results[j];
    results[j] = temp;
  }

  // console.log(results);

  // runTests(results);

  return results;
};
