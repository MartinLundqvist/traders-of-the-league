import { testPlayer } from './testData';
import {
  countNrCargoColor,
  countNrCitiesEmptied,
  countNrContractsColor,
  countNrContractsRegion,
  countNrContractsVP,
  sumItemsMoreThan,
  TProgressionValues,
} from '../utils/achievementFunctions';
import { TCargo, TRegion } from '../../../../shared/types';

describe('Testing achievement functions', () => {
  describe('countNrContractsVP', () => {
    test('countNrContractsVP - [1]', () => {
      const values = [1];
      const { achievement, achievedTargets } = countNrContractsVP(
        testPlayer,
        values
      );
      expect(achievement).toEqual([3]);
    });

    test('countNrContractsVP - [1,2,5]', () => {
      const values = [1, 2, 5];
      const { achievement, achievedTargets } = countNrContractsVP(
        testPlayer,
        values
      );
      expect(achievement).toEqual([3, 4, 1]);
    });

    test('countNrContractsVP - [3,7]', () => {
      const values = [3, 7];
      const { achievement, achievedTargets } = countNrContractsVP(
        testPlayer,
        values
      );
      expect(achievement).toEqual([1, 0]);
    });

    test('countNrContractsVP - []', () => {
      const values = [] as number[];
      const { achievement, achievedTargets } = countNrContractsVP(
        testPlayer,
        values
      );
      expect(achievement).toEqual([]);
    });
  });

  describe('countNrCargoColor', () => {
    test(`countNrCargoColor - ['black','red']`, () => {
      const values = ['black', 'red'] as TCargo[];
      const { achievement, achievedTargets } = countNrCargoColor(
        testPlayer,
        values
      );
      expect(achievement).toEqual([3, 3]);
    });

    test(`countNrCargoColor - ['blue','gray']`, () => {
      const values = ['blue', 'gray'] as TCargo[];
      const { achievement, achievedTargets } = countNrCargoColor(
        testPlayer,
        values
      );
      expect(achievement).toEqual([0, 2]);
    });

    test(`countNrCargoColor - []`, () => {
      const values = [] as TCargo[];
      const { achievement, achievedTargets } = countNrCargoColor(
        testPlayer,
        values
      );
      expect(achievement).toEqual([]);
    });
  });

  describe('countNrContractsColor', () => {
    test(`countNrContractsColor - ['black','red']`, () => {
      const values = ['black', 'red'] as TCargo[];
      const { achievement, achievedTargets } = countNrContractsColor(
        testPlayer,
        values
      );
      expect(achievement).toEqual([3, 3]);
    });

    test(`countNrContractsColor - ['blue','gray']`, () => {
      const values = ['blue', 'gray'] as TCargo[];
      const { achievement, achievedTargets } = countNrContractsColor(
        testPlayer,
        values
      );
      expect(achievement).toEqual([0, 2]);
    });

    test(`countNrContractsColor - []`, () => {
      const values = [] as TCargo[];
      const { achievement, achievedTargets } = countNrContractsColor(
        testPlayer,
        values
      );
      expect(achievement).toEqual([]);
    });
  });

  describe('countNrContractsRegion', () => {
    test(`countNrContractsRegion - ['Central','West']`, () => {
      const values = ['Central', 'West'] as TRegion[];
      const { achievement, achievedTargets } = countNrContractsRegion(
        testPlayer,
        values
      );
      expect(achievement).toEqual([3, 3]);
    });
    test(`countNrContractsRegion - ['East']`, () => {
      const values = ['East'] as TRegion[];
      const { achievement, achievedTargets } = countNrContractsRegion(
        testPlayer,
        values
      );
      expect(achievement).toEqual([3]);
    });
    test(`countNrContractsRegion - []`, () => {
      const values = [] as TRegion[];
      const { achievement, achievedTargets } = countNrContractsRegion(
        testPlayer,
        values
      );
      expect(achievement).toEqual([]);
    });
  });

  describe('countNrCitiesEmptied', () => {
    test(`countNrCitiesEmptied`, () => {
      const values = [] as TProgressionValues[];
      const { achievement, achievedTargets } = countNrCitiesEmptied(
        testPlayer,
        values
      );
      expect(achievement).toEqual([3]);
    });
  });

  describe('sumItemsMoreThan', () => {
    test(`sumItemsMoreThan 3 [0,4,6]`, () => {
      const values = [0, 2, 6];
      const result = sumItemsMoreThan[3](values);
      expect(result).toEqual(5);
    });
    test(`sumItemsMoreThan 2 [2,2,2]`, () => {
      const values = [2, 2, 2];
      const result = sumItemsMoreThan[2](values);
      expect(result).toEqual(6);
    });
    test(`sumItemsMoreThan 1 [0,0,0]`, () => {
      const values = [0, 0, 0];
      const result = sumItemsMoreThan[1](values);
      expect(result).toEqual(0);
    });
  });
});
