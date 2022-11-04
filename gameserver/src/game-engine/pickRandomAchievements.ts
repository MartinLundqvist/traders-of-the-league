import { IAchievement } from '../../../shared/types';
import { ACHIEVEMENTS, ACHIEVEMENT_NAMES } from './constants';

export const pickRandomAchievements = (
  numberOfPlayers: number
): IAchievement[] => {
  // Create an achievements array based on how many players are starting.
  const achievements = ACHIEVEMENTS.filter(
    (achievement) =>
      numberOfPlayers >= achievement.nrPlayers[0] &&
      numberOfPlayers <= achievement.nrPlayers[1]
  );

  // Make a randomized copy of the contract names
  let tempArray = [...ACHIEVEMENT_NAMES];

  // Randomize the array (using Fisher-Yates algorithm)
  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = tempArray[i];
    tempArray[i] = tempArray[j];
    tempArray[j] = temp;
  }

  // now pick the first X names, where X is numberOfPlayers + 1
  tempArray = tempArray.slice(0, numberOfPlayers + 1);

  // console.log(tempArray);

  // Finally we can create the resulting achievements array
  const results: IAchievement[] = tempArray.map((name) => {
    const side = Math.round(Math.random()) === 0 ? 'A' : 'B';
    // console.log(side);

    const pickedAchievement = achievements.find(
      (achievement) => achievement.name === name && achievement.side === side
    );

    // console.log(pickedAchievement);

    return {
      name: pickedAchievement?.name || '',
      description: pickedAchievement?.description || '',
      value: pickedAchievement?.value || 0,
      target: pickedAchievement?.target || 0,
      uuid: pickedAchievement?.uuid || '',
    };
  });

  // //create uniqe array of even numbers 0-15 that is numberOfPlayers + 1  long. This is to pick a "card" with two sides.
  // const randomSet = new Set<number>();

  // while (randomSet.size < numberOfPlayers + 1) {
  //   randomSet.add(Math.floor(Math.random() * 8) * 2);
  // }

  // //then we randomize whether the card was picked A or B side when we create the array.
  // const results = Array.from(randomSet).map((randomNumber) => {
  //   const addZeroOrOne = Math.floor(Math.random() * 2);
  //   return ACHIEVEMENTS[randomNumber + addZeroOrOne];
  // });

  return results;
};
