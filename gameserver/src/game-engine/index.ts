import {
  IBoardPosition,
  IContract,
  IGame,
  IPlayer,
  IUser,
  TCargo,
} from '../../../shared/types';
import { createNewContracts } from './createNewContracts';
import { moveIsAllowed } from './moveIsAllowed';
import { pickContractByRegion } from './pickContractByRegion';
import {
  BOARD,
  MAX_MOVES,
  playerColors,
  playerInitialCargo,
} from './constants';
import { loadingIsAllowed } from './loadingIsAllowed';
import { tradeIsAllowed } from './tradeIsAllowed';
import { ditchingIsAllowed } from './ditchingIsAllowed';

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
        movesMade: [],
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

const addPlayerToGame = (user: IUser, game: IGame): IPlayer => {
  // Pick the next avaiable player color
  // Put the player in Lübeck by default
  // Provide initial cargo as per game instructions

  const thisPlayerIndex = game.players.length;

  let newPlayer: IPlayer = {
    color: playerColors[thisPlayerIndex],
    user,
    contractsFulfilled: [],
    citiesEmptied: [],
    achievements: [],
    position: { column: 5, row: 6 },
    victoryPoints: 0,
    cargo: thisPlayerIndex === 0 ? [] : [playerInitialCargo[thisPlayerIndex]],
  };

  return newPlayer;
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
  game.state.currentRound.movesMade = [];

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

  if (game.state.currentRound.movesMade.includes('sail')) {
    console.log('Current player has already sailed');
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

  // And add the 'sail' as a move made
  game.state.currentRound.movesMade.push('sail');

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

  if (game.state.currentRound.movesMade.includes('load')) {
    console.log('Current player has already loaded cargo');
    return false;
  }

  const currentPlayer = game.players.find(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );

  if (!currentPlayer) {
    console.log('No player found');
    return false;
  }

  // const currentPosition = currentPlayer.position;

  // First check whether player is in a city, is loading valid cargo, and there is space in the cargo
  let valid = loadingIsAllowed(currentPlayer, cargo);

  if (!valid) {
    console.log('Not a valid move');
    return false;
  }

  // If it is valid, update the cargo hold of the player
  currentPlayer.cargo = [...currentPlayer.cargo, ...cargo];

  // And decrement moves left
  game.state.currentRound.movesLeft -= 1;

  // And add the 'load' as a move made
  game.state.currentRound.movesMade.push('load');

  // If this was the last move, then end the round
  if (game.state.currentRound.movesLeft === 0) {
    endCurrentPlayerRound(game);
  }

  return true;
};

const ditchCargoForCurrentPlayer = (game: IGame, cargo: TCargo[]): boolean => {
  const currentPlayer = game.players.find(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );

  if (!currentPlayer) {
    console.log('No player found');
    return false;
  }

  // const currentPosition = currentPlayer.position;

  // First check whether player is in a city, is loading valid cargo, and there is space in the cargo
  let valid = ditchingIsAllowed(currentPlayer, cargo);

  if (!valid) {
    console.log('Not a valid ditch');
    return false;
  }

  // If it is valid, update the cargo hold of the player
  cargo.forEach((cargoToDitch) => {
    const indexToDitch = currentPlayer.cargo.findIndex(
      (playerCargo) => playerCargo === cargoToDitch
    );
    currentPlayer.cargo.splice(indexToDitch, 1);
  });

  return true;
};

const makeTradesForCurrentPlayer = (
  game: IGame,
  contracts: IContract[]
): boolean => {
  if (game.state.currentRound.movesLeft === 0) {
    console.log('Current player has no moves left');
    return false;
  }

  if (game.state.currentRound.movesMade.includes('trade')) {
    console.log('Current player has already traded cargo');
    return false;
  }

  const currentPlayer = game.players.find(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );

  if (!currentPlayer) {
    console.log('No player found');
    return false;
  }

  const currentHex = game.board.find(
    (hex) =>
      hex.column === currentPlayer.position.column &&
      hex.row === currentPlayer.position.row
  );

  if (!currentHex || !currentHex.city) {
    console.log('Player is not in a city');
    return false;
  }

  if (contracts.length < 1) {
    console.log('No contracts to trade');
    return false;
  }

  // Now we can attempt to execute the trade.
  // IMPORTANT!! This function mutates the game, if the trade is successful!
  let valid = tradeIsAllowed(currentPlayer, currentHex.city, contracts);

  if (!valid) {
    console.log('Not a valid trade');
    return false;
  }

  // If it is valid, decrement moves left
  game.state.currentRound.movesLeft -= 1;

  // And add the 'trade' as a move made
  game.state.currentRound.movesMade.push('trade');

  // If this was the last move, then end the round
  if (game.state.currentRound.movesLeft === 0) {
    endCurrentPlayerRound(game);
  }

  return true;
};

export const GameEngine = {
  createGame,
  start,
  addPlayerToGame,
  endCurrentPlayerRound,
  sailCurrentPlayerTo,
  loadCargoForCurrentPlayer,
  ditchCargoForCurrentPlayer,
  makeTradesForCurrentPlayer,
};
