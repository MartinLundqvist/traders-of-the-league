export interface IEloFunction {
  getExpectedScore: (playerRating: number, opponentRating: number) => number;
  getUpdatedRating: (
    expectedScore: number,
    actualScore: number,
    currentRating: number
  ) => number;
}

interface ICreateEloFunction {
  (k?: number, D?: number): IEloFunction;
}

/**
 * Function factory which returns an EloFunction object.
 * The k factor determines how much a win or loss will affect the rating
 * The D (Distribution) factor determines how much the difference in rating will affect the expected outcome.
 *
 * @param k the k factor, defaults to 32
 * @param D the D factor, defaults to 400
 * @returns an EloFunction object
 */

export const createEloFunction: ICreateEloFunction = (k = 32, D = 400) => {
  const newEloFunction: IEloFunction = {
    getExpectedScore: (playerRating: number, opponentRating: number) => {
      return getExpectedScore(playerRating, opponentRating, D);
    },
    getUpdatedRating: (
      expectedScore: number,
      actualScore: number,
      currentRating: number
    ) => {
      return getUpdatedRating(expectedScore, actualScore, currentRating, k);
    },
  };

  return newEloFunction;
};

const getExpectedScore = (a: number, b: number, D: number) => {
  return 1 / (1 + Math.pow(10, (b - a) / D));
};

const getUpdatedRating = (e: number, a: number, c: number, k: number) => {
  return Math.round(c + k * (a - e));
};
