import { IPlayer } from '../../../../shared/types';
import { ACHIEVEMENTS } from '../constants';
import { IAchievementInner } from '../utils/achievementFunctions';
import { testPlayer } from './testData';

// For each achievement we want to test whether the progression calculations are correct

const getProgress = (
  innerAchievement: IAchievementInner,
  currentPlayer: IPlayer
) => {
  const { progressionFn, progressionArg, targetFn } = innerAchievement;
  const { achievement: achProgress, achievedTargets } = progressionFn(
    currentPlayer,
    progressionArg
  );
  const progress = targetFn(achProgress);
  return progress;
};

describe('Testing achievement progression calculations', () => {
  describe('Target type: Contracts', () => {
    test('Banker_A_2-5_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Banker_A_2-5_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Four contracts worth 3 VP'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(1);
    });
    test('Banker_B_2-5_3P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Banker_B_2-5_3P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Four contracts worth 3 or 5 VP'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(2);
    });
    test('Merchant_A_2-3_5P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Merchant_A_2-3_5P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Six contracts worth 1 VP');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Merchant_B_2-3_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Merchant_B_2-3_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Seven contracts worth 1 or 2 VP'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(7);
    });
    test('Merchant_A_4-5_5P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Merchant_A_4-5_5P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Five contracts worth 1 VP'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Merchant_B_4-5_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Merchant_B_4-5_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Six contracts worth 1 or 2 VP'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(7);
    });
    test('Monopolist_A_2-3_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Monopolist_A_2-3_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Six contracts with same color'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(4);
    });
    test('Monopolist_B_4-5_3P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Monopolist_B_4-5_3P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Five contracts with same color'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(4);
    });
    test('Specialist_A_2-5_3P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Specialist_A_2-5_3P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Three blue contracts');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(0);
    });
    test('Specialist_B_2-5_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Specialist_B_2-5_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Four green contracts');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Explorer_A_2-5_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Explorer_A_2-5_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Two contracts from each region'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(6);
    });
    test('Regional_A_2-5_5P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Regional_A_2-5_5P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Five Central contracts');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Explorer_B_2-5_3P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Explorer_B_2-5_3P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'One contract from each region'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Regional_B_2-5_3P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Regional_B_2-5_3P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Four Western contracts');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
  });
  describe('Target type: Cargo', () => {
    test('Diversifier_A_2-5_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Diversifier_A_2-5_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Cargo in every color');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(6);
    });
    test('Diversifier_B_2-5_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Diversifier_B_2-5_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual(
        'Two red, yellow and gray cargo'
      );
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(6);
    });
  });

  describe('Target type: Cities', () => {
    test('Supplier_A_2-3_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Supplier_A_2-3_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Three emptied cities');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Supplier_B_2-3_4P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Supplier_B_2-3_4P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Three emptied cities');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Supplier_B_4-5_3P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Supplier_B_4-5_3P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Two emptied cities');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Supplier_A_4-5_3P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Supplier_A_4-5_3P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Two emptied cities');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
    test('Supplier_B_4-5_3P', () => {
      const innerAchievement = ACHIEVEMENTS.find(
        (_achievement) => _achievement.uuid === 'Supplier_B_4-5_3P'
      );
      expect(innerAchievement).toBeTruthy();
      expect(innerAchievement!.description).toEqual('Two emptied cities');
      const progress = getProgress(innerAchievement!, testPlayer);
      expect(progress).toEqual(3);
    });
  });
});
