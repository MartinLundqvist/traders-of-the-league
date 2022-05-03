import { IGame, IGameResults, IPlayerStats } from '../../../shared/types';

export const getGameResults = (game: IGame): IGameResults => {
  // Rank players by victory points first, and number of contracts second
  game.players.sort((player1, player2) => {
    if (player1.victoryPoints === player2.victoryPoints)
      return (
        player2.contractsFulfilled.length - player1.contractsFulfilled.length
      );

    return player2.victoryPoints - player1.victoryPoints;
  });

  let tie = false;

  if (
    game.players[0].victoryPoints === game.players[1].victoryPoints &&
    game.players[0].contractsFulfilled.length ===
      game.players[1].contractsFulfilled.length
  ) {
    tie = true;
  }

  const playerStats: IPlayerStats[] = game.players.map((player, index) => {
    return {
      uuid: player.user.uuid,
      name: player.user.name,
      rank: index + 1,
      victoryPoints: player.victoryPoints,
      nrContractsFulfilled: player.contractsFulfilled.length,
    };
  });

  const results: IGameResults = {
    game,
    playerStats,
    tie,
  };

  return results;
};
