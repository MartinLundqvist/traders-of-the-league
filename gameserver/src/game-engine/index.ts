import { IBoardPosition, IGame, TCargo } from '../../../shared/types';
import { createNewContracts } from './createNewContracts';
import { moveIsAllowed } from './moveIsAllowed';
import { pickContractByRegion } from './pickContractByRegion';
import { BOARD, MAX_MOVES } from './constants';
import { loadingIsAllowed } from './loadingIsAllowed';

const createGame = (gameName: string, gameUuid: string): IGame => {
  const newGame: IGame = {
    name: gameName,
    uuid: gameUuid,
    players: [],
    board: BOARD,
    state: {
      currentRound: {
        playerUuid: '',
        movesLeft: 2,
      },
      round: 0,
      started: false,
      status: 'waiting',
    },
  };

  return newGame;
};

const start = (game: IGame, firstPlayerUuid: string) => {
  game.state.status = 'playing';
  game.state.started = true;
  game.state.currentRound.playerUuid = firstPlayerUuid;
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

const endCurrentPlayerRound = (game: IGame) => {
  // Compute the current state of the game
  // TODO: TBD

  // Figure out if the game has been won
  // TODO: TBD

  // Set to the next player
  const currentPlayerIndex = game.players.findIndex(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );
  const lastPlayerIndex = game.players.length - 1;
  const nextPlayerIndex =
    currentPlayerIndex === lastPlayerIndex ? 0 : currentPlayerIndex + 1;

  game.state.currentRound.playerUuid = game.players[nextPlayerIndex].user.uuid;
  game.state.currentRound.movesLeft = MAX_MOVES;

  // Increment round counter
  game.state.round += 1;
};

const sailCurrentPlayerTo = (
  game: IGame,
  position: IBoardPosition
): boolean => {
  if (game.state.currentRound.movesLeft === 0) {
    console.log('Current player has no moves left');
    return false;
  }

  const currentPlayer = game.players.find(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );

  if (!currentPlayer) {
    console.log('No player found');
    return false;
  }

  const currentPosition = currentPlayer.position;

  // First check whether this is a valid move
  let valid = moveIsAllowed(currentPosition, position);

  if (!valid) {
    console.log('Not a valid move');
    return false;
  }

  // If it is valid, update the position of the player
  currentPlayer.position = position;

  // And decrement moves left
  game.state.currentRound.movesLeft -= 1;

  // If this was the last move, then end the round
  if (game.state.currentRound.movesLeft === 0) {
    endCurrentPlayerRound(game);
  }

  return true;
};
const loadCargoForCurrentPlayer = (game: IGame, cargo: TCargo[]): boolean => {
  if (game.state.currentRound.movesLeft === 0) {
    console.log('Current player has no moves left');
    return false;
  }

  const currentPlayer = game.players.find(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );

  if (!currentPlayer) {
    console.log('No player found');
    return false;
  }

  const currentPosition = currentPlayer.position;

  // First check whether player is in a city, is loading valid cargo, and there is space in the cargo
  let valid = loadingIsAllowed(currentPlayer, cargo);

  if (!valid) {
    console.log('Not a valid move');
    return false;
  }

  // If it is valid, update the position of the player
  currentPlayer.cargo = [...currentPlayer.cargo, ...cargo];

  // And decrement moves left
  game.state.currentRound.movesLeft -= 1;

  // If this was the last move, then end the round
  if (game.state.currentRound.movesLeft === 0) {
    endCurrentPlayerRound(game);
  }

  return true;
};

export const GameEngine = {
  createGame,
  start,
  endCurrentPlayerRound,
  sailCurrentPlayerTo,
  loadCargoForCurrentPlayer,
};
