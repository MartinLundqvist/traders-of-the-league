/**
 * A contract is characterized by
 * - 1-5 VPs
 * - A combination of two colors (7 colors in total), always two different colors
 * - A region of belonging, three in total
 */

import { IContract, TCargo } from '../types';
import { randomPoint } from './randomPoint';

export const createNewContracts = (): IContract[] => {
  const results: IContract[] = [];

  // We start by creating a helper array with all cargo types (colors)
  const colorArray: TCargo[] = [
    'black',
    'brown',
    'blue',
    'gray',
    'green',
    'red',
    'yellow',
  ];

  // Then we loop through each color pair (avoiding similar pairs)
  for (let i = 0; i < colorArray.length; i++) {
    for (let j = i + 1; j < colorArray.length; j++) {
      // We create one contract for each region, with a random victory point
      results.push({
        value: randomPoint(),
        cargo: [colorArray[i], colorArray[j]],
        region: 'East',
      });
      results.push({
        value: randomPoint(),
        cargo: [colorArray[i], colorArray[j]],
        region: 'Central',
      });
      results.push({
        value: randomPoint(),
        cargo: [colorArray[i], colorArray[j]],
        region: 'West',
      });
    }
  }

  // Finally, we randomize the array (using Fisher-Yates algorithm)
  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = results[i];
    results[i] = results[j];
    results[j] = temp;
  }

  return results;
};
