import { random } from 'nanoid';
import { IAchievement } from '../../../shared/types';
import { ACHIEVEMENTS } from './constants';

export const pickRandomAchievements = (
  numberOfAchievements: number
): IAchievement[] => {
  //create uniqe array of even numbers 0-15 that is numberOfAchievements  long. This is to pick a "card" with two sides.
  const randomSet = new Set<number>();

  while (randomSet.size < numberOfAchievements) {
    randomSet.add(Math.floor(Math.random() * 8) * 2);
  }

  //then we randomize whether the card was picked A or B side when we create the array.
  const results = Array.from(randomSet).map((randomNumber) => {
    const addZeroOrOne = Math.floor(Math.random() * 2);
    return ACHIEVEMENTS[randomNumber + addZeroOrOne];
  });

  return results;
};
