import { createEloFunction, IEloFunction } from './elo';

type TPlayersRated = number[];
type TPlayersScored = number[];
type TPlayersPositioned = number[];

/**
 * Creates a RatedGame object which implements the rating system suggested
 * in https://towardsdatascience.com/developing-a-generalized-elo-rating-system-for-multiplayer-games-b9b495e87802.
 *
 * @param ratedPlayers Array of ratings for the players. Array can be of any length > 1
 * @param alfa The exponent factor. Defaults to 1 (linear).
 * @returns A RatedGame object
 */

export const createRatedGame = (ratedPlayers: TPlayersRated, alfa = 1) => {
  const k = 32;
  const D = 400;

  if (ratedPlayers.length < 2)
    throw new Error('createRatedGame requires an array of minimum 2 players');

  const elo = createEloFunction(k, D);

  return {
    getExpectedScores: () => getExpectedScores(elo, ratedPlayers),
    getActualScores: (positionedPlayers: TPlayersPositioned) =>
      getActualScores(positionedPlayers, alfa),
    getUpdatedRatings: (positionedPlayers: TPlayersPositioned) =>
      getUpdatedRatings(
        k,
        getExpectedScores(elo, ratedPlayers),
        getActualScores(positionedPlayers, alfa),
        ratedPlayers
      ),
  };
};

const getExpectedScores = (
  elo: IEloFunction,
  p: TPlayersRated
): TPlayersScored => {
  let result: TPlayersScored = [];

  for (let i = 0; i < p.length; i++) {
    let sum = 0;
    for (let j = 0; j < p.length; j++) {
      if (j === i) continue;
      let score = elo.getExpectedScore(p[i], p[j]);
      sum += score;
    }
    let expectedscore = sum / ((p.length * (p.length - 1)) / 2);
    result.push(expectedscore);
  }

  return result;
};

const getUpdatedRatings = (
  k: number,
  e: TPlayersScored,
  a: TPlayersScored,
  c: TPlayersRated
): TPlayersRated => {
  let results: TPlayersRated = [];
  const N = e.length;

  for (let i = 0; i < N; i++) {
    results.push(getUpdatedRating(k, N, e[i], a[i], c[i]));
  }

  return results;
};

const getUpdatedRating = (
  k: number,
  N: number,
  e: number,
  a: number,
  c: number
) => {
  return Math.round(c + k * (N - 1) * (a - e));
};

const getActualScores = (p: TPlayersPositioned, a: number): TPlayersScored => {
  return p.map((_p) => scoreFunction(p.length, _p, a));
};

const scoreFunction = (N: number, p: number, a = 1) => {
  if (a === 1) {
    return (N - p) / ((N * (N - 1)) / 2);
  }

  let nominator = Math.pow(a, N - p) - 1;
  let denominator = 0;
  for (let i = 1; i <= N; i++) {
    denominator += Math.pow(a, N - i) - 1;
  }

  return nominator / denominator;
};
