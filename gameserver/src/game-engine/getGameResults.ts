import { IGame, IGameResults, IPlayerStats } from '../../../shared/types';

export const getGameResults = (game: IGame): IGameResults => {
  // Create two copies of the player arrays, one for the timedOut ones, and one for the others
  const timedOutPlayers = game.players.filter((player) => player.hasTimedOut);
  const completedPlayers = game.players.filter((player) => !player.hasTimedOut);
  let tie = false;

  if (completedPlayers.length > 1) {
    // Rank completed players by victory points followed by number of contracts
    completedPlayers.sort((player1, player2) => {
      if (player1.victoryPoints === player2.victoryPoints)
        return (
          player2.contractsFulfilled.length - player1.contractsFulfilled.length
        );

      return player2.victoryPoints - player1.victoryPoints;
    });

    if (
      completedPlayers[0].victoryPoints === completedPlayers[1].victoryPoints &&
      completedPlayers[0].contractsFulfilled.length ===
        completedPlayers[1].contractsFulfilled.length
    ) {
      tie = true;
    }
  }

  if (timedOutPlayers.length > 1) {
    // Then rank the timedout ones based on which round they timed out in
    timedOutPlayers.sort(
      (player1, player2) => player2.timedOutRound - player1.timedOutRound
    );
  }

  // Put the timedout ones at the bottom and return the combined array

  const playerStats: IPlayerStats[] = [
    ...completedPlayers,
    ...timedOutPlayers,
  ].map((player, index) => {
    return {
      uuid: player.user.uuid,
      name: player.user.name,
      rank: index + 1,
      victoryPoints: player.victoryPoints,
      nrContractsFulfilled: player.contractsFulfilled.length,
      timedOut: player.hasTimedOut,
      timedOutRound: player.timedOutRound,
    };
  });

  const results: IGameResults = {
    game,
    playerStats,
    tie,
  };

  return results;
};
