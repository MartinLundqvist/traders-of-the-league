import { IGame } from '../../../shared/types';
import { createNewContracts } from './createNewContracts';
import { pickContractByRegion } from './pickContractByRegion';

const start = (game: IGame, firstPlayerUuid: string) => {
  game.state.status = 'playing';
  game.state.started = true;
  game.state.currentPlayerUuid = firstPlayerUuid;
  game.state.round = 1;

  dealContracts(game);
};

const dealContracts = (game: IGame) => {
  const newContracts = createNewContracts();
  const board = game.board;
  board.forEach((element) => {
    if (element.city) {
      let pickedContracts = [];
      pickedContracts.push(
        pickContractByRegion(newContracts, element.city.region)
      );
      pickedContracts.push(
        pickContractByRegion(newContracts, element.city.region)
      );
      pickedContracts.push(
        pickContractByRegion(newContracts, element.city.region)
      );
      element.city.contracts = pickedContracts;
    }
  });
};

const endMove = (game: IGame, playerUuid: string) => {
  // Compute the current state of the game
  // TODO: TBD

  // Figure out if the game has been won
  // TODO: TBD

  // Set to the next player
  const currentPlayerIndex = game.players.findIndex(
    (player) => player.user.uuid === playerUuid
  );
  const lastPlayerIndex = game.players.length - 1;
  const nextPlayerIndex =
    currentPlayerIndex === lastPlayerIndex ? 0 : currentPlayerIndex + 1;

  game.state.currentPlayerUuid = game.players[nextPlayerIndex].user.uuid;
};

export const GameEngine = {
  start,
  endMove,
};
