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
  numberOfCitiesToEmpty,
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
    numberOfCitiesToEmpty: 5,
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
      numberOfCitiesEmptied: 0,
    },
  };

  return newGame;
};

const start = (game: IGame, firstPlayerUuid: string) => {
  game.state.status = 'playing';
  game.state.started = true;
  game.state.currentRound.playerUuid = firstPlayerUuid;
  game.state.round = 1;
  game.numberOfCitiesToEmpty = numberOfCitiesToEmpty[game.players.length];

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
    hasMadeEndGameMove: false,
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
  // Update citiesEmptied counter
  game.state.numberOfCitiesEmptied = game.players.reduce((sum, player) => {
    console.log(
      'Player ' +
        player.user.name +
        ' has ' +
        player.citiesEmptied.length +
        ' cities emptied'
    );
    return sum + player.citiesEmptied.length;
  }, 0);

  // Get a reference to the current player for convenience
  const currentPlayer = game.players.find(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );

  if (!currentPlayer) {
    console.log(
      'Something went wrong when fetching current player in the endCurrentPlayerRound function'
    );
    return;
  }

  // Are we in the end game?
  // We need to check more than or equal to, since additional cities may be emptied during the endgame
  if (game.state.numberOfCitiesEmptied >= game.numberOfCitiesToEmpty) {
    // Ensure we switch to / remain in  'endgame' status
    game.state.status = 'endgame';
  }

  // If we are in the endgame, toggle the hasMadeEndGameMove flag on the Player state
  if (game.state.status === 'endgame') {
    currentPlayer.hasMadeEndGameMove = true;
  }

  // Check whether the game is over. This happens when all the player's endgame moves have been made.
  if (game.players.every((player) => player.hasMadeEndGameMove === true)) {
    console.log('WON!!');
    game.state.status = 'won';
    return;
  }

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
