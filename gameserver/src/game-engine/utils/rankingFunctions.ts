import { IGameResults, IRanking, IUser } from '../../../../shared/types';

export const parseGameResults = (gameResults: IGameResults) => {
  const playerStats = gameResults.playerStats;

  const players = playerStats.map((player) => ({
    name: player.name,
    uuid: player.uuid,
  }));
  const playerPositions = playerStats.map((player) => player.rank);

  return {
    players,
    playerPositions,
  };
};

export const getCurrentRankings = (
  currentRankings: IRanking[],
  players: Omit<IUser, 'connected'>[],
  startRank: number
): IRanking[] => {
  const results: IRanking[] = [];

  for (const player of players) {
    let rankedPlayer = currentRankings.find(
      (ranking) => ranking.user.uuid === player.uuid
    );

    if (!rankedPlayer) {
      console.log(
        'Player ' +
          player.name +
          ' not found in the Rankings[] array provided to the getCurrentRankings function. Creating new.'
      );

      rankedPlayer = createNewRanking(player.name, player.uuid, startRank);
    }

    results.push(rankedPlayer);
  }

  return results;
};
export const getCurrentEloRatings = (
  currentRankings: IRanking[],
  players: Omit<IUser, 'connected'>[]
): number[] => {
  const results: number[] = [];

  for (const player of players) {
    let rankedPlayer = currentRankings.find(
      (ranking) => ranking.user.uuid === player.uuid
    );

    if (!rankedPlayer) {
      console.log(
        'Player ' +
          player.name +
          ' not found in the Rankings[] array provided to the getCurrentEloRatings function. Returning an empty array'
      );

      return [];
    }

    results.push(rankedPlayer.currentRanking);
  }

  return results;
};

const createNewRanking = (
  name: string,
  uuid: string,
  startRank: number
): IRanking => {
  const newRanking: IRanking = {
    user: {
      name,
      uuid,
    },
    currentRanking: startRank,
    rankingHistory: [],
  };

  return newRanking;
};
