import { IContract, TCargo, TVictoryPoint } from '../../../shared/types';

/**
 * A contract is characterized by
 * - 1-5 VPs
 * - A combination of two colors (7 colors in total), always two different colors
 * - A region of belonging, three in total
 */
export const createNewContracts = (): IContract[] => {
  const results: IContract[] = [];

  // We start by creating a helper array with all cargo types (colors)
  const colorArray: TCargo[] = [
    'red',
    'yellow',
    'gray',
    'green',
    'blue',
    'brown',
    'black',
  ];

  // This is directly from the game-makers instructions. We assume West, Central, East order from top to bottom. '0' means skip creating this contract.
  const valueArray = [
    [2, 2, 5],
    [3, 5, 3],
    [1, 3, 5],
    [2, 2, 3],
    [1, 3, 3],
    [0, 2, 3],
    [5, 2, 2],
    [2, 0, 3],
    [3, 1, 2],
    [2, 2, 2],
    [2, 1, 2],
    [3, 2, 2],
    [5, 2, 1],
    [3, 3, 1],
    [3, 2, 0],
    [2, 1, 2],
    [0, 2, 2],
    [1, 1, 2],
    [2, 2, 0],
    [2, 1, 1],
    [1, 2, 0],
  ];

  // Then we loop through each color pair (avoiding similar pairs)
  let valueIndex = 0;

  for (let i = 0; i < colorArray.length - 1; i++) {
    for (let j = i + 1; j < colorArray.length; j++) {
      const values = valueArray[valueIndex];
      valueIndex++;

      // console.log(values);

      // We create one contract for each region, with the designated value.
      // IF the value is '0', we skip that contract
      if (values[0]) {
        results.push({
          value: values[0] as TVictoryPoint,
          cargo: [colorArray[i], colorArray[j]],
          region: 'West',
        });
      }
      if (values[1]) {
        results.push({
          value: values[1] as TVictoryPoint,
          cargo: [colorArray[i], colorArray[j]],
          region: 'Central',
        });
      }
      if (values[2]) {
        results.push({
          value: values[2] as TVictoryPoint,
          cargo: [colorArray[i], colorArray[j]],
          region: 'East',
        });
      }
    }
  }

  // Some tests:
  // Total number of contracts should be 57
  // Number of contracts in West should be 19
  // Number of contracts in Central should be 20
  // Number of contracts in East should be 18
  // Average score in West should be 2.37
  // Average score in Central should be 2.05
  // Average score in East should be 2.44
  const runTests = (contracts: IContract[]) => {
    const w = contracts.filter((contract) => contract.region === 'West');
    const c = contracts.filter((contract) => contract.region === 'Central');
    const e = contracts.filter((contract) => contract.region === 'East');

    const total = contracts.length;
    const totalW = w.length;
    const totalC = c.length;
    const totalE = e.length;
    const avgW = w.reduce((prev, current) => prev + current.value, 0) / totalW;
    const avgC = c.reduce((prev, current) => prev + current.value, 0) / totalC;
    const avgE = e.reduce((prev, current) => prev + current.value, 0) / totalE;

    console.log(total, totalW, totalC, totalE, avgW, avgC, avgE);
  };

  // Finally, we randomize the array (using Fisher-Yates algorithm)
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
