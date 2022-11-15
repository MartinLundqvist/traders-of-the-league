import {
  IAchievement,
  IBoardPosition,
  IContract,
  IGame,
  IPlayer,
  IUser,
  TCargo,
} from '../../../shared/types';
import { createNewContracts } from './createNewContracts';
import { getHexesWithinRangeOf } from './getHexesWithinRangeOf';
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
import { updateAchievementsProgressAndReturnEarnedAchievements } from './findAchievementsEarned';
import { getGameResults } from './getGameResults';
import { pickRandomAchievements } from './pickRandomAchievements';

const createGame = (
  gameName: string,
  gameTempo: number,
  gameUuid: string
): IGame => {
  const newGame: IGame = {
    name: gameName,
    uuid: gameUuid,
    players: [],
    numberOfCitiesToEmpty: 5,
    achievements: [],
    board: BOARD,
    startTime: 0,
    endTime: 0,
    tempo: gameTempo,
    state: {
      currentRound: {
        playerUuid: '',
        movesLeft: 2,
        movesAvailable: ['load', 'sail', 'trade'],
        achievementsEarned: [],
        hexesWithinRange: [],
        startTime: 0,
      },
      round: 0,
      status: 'waiting',
      numberOfCitiesEmptied: 0,
    },
  };

  console.log('Creating new game with tempo ' + newGame.tempo);

  return newGame;
};

const start = (game: IGame, firstPlayerUuid: string) => {
  game.state.status = 'playing';
  game.state.currentRound.playerUuid = firstPlayerUuid;
  game.state.round = 1;
  game.numberOfCitiesToEmpty = numberOfCitiesToEmpty[game.players.length];
  game.startTime = new Date().getTime();
  game.state.currentRound.hexesWithinRange = getHexesWithinRangeOf({
    row: 6,
    column: 5,
  }); // Lübeck

  game.state.currentRound.startTime = game.startTime;

  dealContracts(game);
  dealAchievements(game);
};

const terminate = (game: IGame) => {
  game.state.status = 'terminated';
  game.endTime = new Date().getTime();
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
    achievementsProgress: [],
    position: { column: 5, row: 6 },
    victoryPoints: 0,
    cargo: thisPlayerIndex === 0 ? [] : [playerInitialCargo[thisPlayerIndex]],
    hasMadeEndGameMove: false,
    hasTimedOut: false,
    timeLeft: game.tempo,
    timedOutRound: 0,
  };

  return newPlayer;
};

const removeUserUuidFromGame = (userUuid: string, game: IGame) => {
  game.players = game.players.filter((player) => player.user.uuid !== userUuid);
};

const dealContracts = (game: IGame) => {
  const newContracts = createNewContracts();
  const board = game.board;
  board.forEach((element) => {
    if (element.city) {
      let pickedContracts = [];
      for (let i = 0; i < element.city.nrContracts; i++) {
        pickedContracts.push(
          pickContractByRegion(newContracts, element.city.region)
        );
      }
      element.city.contracts = pickedContracts;
    }
  });
};

const dealAchievements = (game: IGame) => {
  game.achievements = pickRandomAchievements(game.players.length);

  // Create a fresh achievementsProgress array for each player.
  game.players.forEach((player) => {
    player.achievementsProgress = game.achievements.map((achievement) => {
      return {
        uuid: achievement.uuid,
        target: achievement.target,
        progress: 0,
      };
    });
  });
};

const endCurrentPlayerRound = (game: IGame) => {
  // Update the timers
  updatePlayerTimers(game);

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

  // Check whether the game is over. This happens when all the player's endgame moves have been made,
  // OR when there is only one player (or none...) left that has not timed out.
  const allEndGameMovesDone = game.players.every(
    (player) => player.hasMadeEndGameMove === true
  );
  const onlyOnePlayerLeft =
    game.players.filter((player) => player.hasTimedOut === false).length < 2;
  if (allEndGameMovesDone || onlyOnePlayerLeft) {
    console.log('Game won');
    game.state.status = 'won';
    game.endTime = new Date().getTime();

    return;
  }

  // Set to the next player
  nextPlayer(game);
};

const nextPlayer = (game: IGame) => {
  const cycleToNextPlayer = (uuid: string): IPlayer => {
    const currentPlayerIndex = game.players.findIndex(
      (player) => player.user.uuid === uuid
    );
    const lastPlayerIndex = game.players.length - 1;
    const nextPlayerIndex =
      currentPlayerIndex === lastPlayerIndex ? 0 : currentPlayerIndex + 1;

    return game.players[nextPlayerIndex];
  };

  // cycle to the next player
  let nextPlayer = cycleToNextPlayer(game.state.currentRound.playerUuid);

  // We've got to continue cycling if the player has timed out,
  // the edge case of only being ONE player left that has not timedOut
  // is dealt with later...
  while (nextPlayer.hasTimedOut) {
    console.log(nextPlayer.user.name + ': Has timed out. Cycling');
    nextPlayer = cycleToNextPlayer(nextPlayer.user.uuid);
  }

  game.state.currentRound.playerUuid = nextPlayer.user.uuid;
  game.state.currentRound.movesLeft = MAX_MOVES;
  game.state.currentRound.movesAvailable = ['load', 'sail', 'trade'];
  game.state.currentRound.hexesWithinRange = getHexesWithinRangeOf(
    nextPlayer.position
  );
  game.state.currentRound.startTime = new Date().getTime();

  // Increment round counter
  game.state.round += 1;
};

/**
 * This is the first part of a three step process for ending a player round.
 * Step 1: Checks for achievements. If there are, it updates the state, returns the game state and stops the process.
 * Step 2: Checks whether we are in the 'end game' or if the game is 'won'. If the game is won, it will return the game state and stop the process.
 * Step 3: Cycle to the next player. It finds the next player not timed out, and return the game state and end the proces.
 */

const processEndOfRoundAchievements = (game: IGame) => {
  // Reset the moves available

  // Add an achievementsProgress array to each player. DONE.
  // Declare it upon game creation - when the achievements are added

  // Update the achievements progress for this player

  // If the current player has earned achievements - update the currentRound status

  game.state.currentRound.movesAvailable = [];

  const currentPlayer = game.players.find(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );

  if (!currentPlayer) {
    console.log('No player found');
    return;
  }

  // const achievements = findAchievementsEarned(currentPlayer, game);
  const achievements = updateAchievementsProgressAndReturnEarnedAchievements(
    currentPlayer,
    game
  );

  if (achievements.length > 0) {
    game.state.currentRound.achievementsEarned = achievements.map((a) => {
      return { ...a };
    });
    game.state.currentRound.movesAvailable.push('achieve');
    return;
  }

  endCurrentPlayerRound(game);
};

const sailCurrentPlayerTo = (
  game: IGame,
  position: IBoardPosition
): boolean => {
  if (game.state.currentRound.movesLeft === 0) {
    console.log('Current player has no moves left');
    return false;
  }

  if (!game.state.currentRound.movesAvailable.includes('sail')) {
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

  // const currentPosition = currentPlayer.position;

  // First check whether this is a valid move
  let valid = game.state.currentRound.hexesWithinRange.find(
    (hexInRange) =>
      hexInRange.row === position.row && hexInRange.column === position.column
  );

  if (!valid) {
    console.log('Not a valid move');
    return false;
  }

  // If it is valid, update the position of the player
  currentPlayer.position = position;

  // And decrement moves left
  game.state.currentRound.movesLeft -= 1;

  // And remove the 'sail' as a move available
  game.state.currentRound.movesAvailable =
    game.state.currentRound.movesAvailable.filter((move) => move != 'sail');

  // If this was the last move, then end the round
  if (game.state.currentRound.movesLeft === 0) {
    // endCurrentPlayerRound(game);
    processEndOfRoundAchievements(game);
  }

  return true;
};
const loadCargoForCurrentPlayer = (game: IGame, cargo: TCargo[]): boolean => {
  if (game.state.currentRound.movesLeft === 0) {
    console.log('Current player has no moves left');
    return false;
  }

  if (!game.state.currentRound.movesAvailable.includes('load')) {
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

  // And remove the 'load' as am available move
  game.state.currentRound.movesAvailable =
    game.state.currentRound.movesAvailable.filter((move) => move !== 'load');

  // If this was the last move, then end the round
  if (game.state.currentRound.movesLeft === 0) {
    // endCurrentPlayerRound(game);
    processEndOfRoundAchievements(game);
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

  if (!game.state.currentRound.movesAvailable.includes('trade')) {
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

  if (contracts.length > 2) {
    console.log('Too man contracts being traded');
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

  // And remove the 'trade' as a valid move
  game.state.currentRound.movesAvailable =
    game.state.currentRound.movesAvailable.filter((move) => move !== 'trade');

  // Update citiesEmptied counter in case a city was emptied
  game.state.numberOfCitiesEmptied = game.players.reduce(
    (sum, player) => sum + player.citiesEmptied.length,
    0
  );

  // If this was the last move, then end the round
  if (game.state.currentRound.movesLeft === 0) {
    // endCurrentPlayerRound(game);
    processEndOfRoundAchievements(game);
  }

  return true;
};

const pickAchievementForCurrentPlayer = (
  game: IGame,
  achievement: IAchievement
): boolean => {
  const currentPlayer = game.players.find(
    (player) => player.user.uuid === game.state.currentRound.playerUuid
  );

  if (!currentPlayer) {
    console.log('No player found');
    return false;
  }

  if (!achievement) {
    console.log('No achievement to pick');
    return false;
  }

  if (!game.state.currentRound.movesAvailable.includes('achieve')) {
    console.log('Player already picked achievements');
    return false;
  }

  // Likely unecessary, but bells and whistles...
  let valid =
    game.state.currentRound.achievementsEarned.findIndex(
      (a) => a.name === achievement.name
    ) > -1;

  if (!valid) {
    console.log('Not a valid pick');
    return false;
  }

  // If it is valid, add the achievement to the player state, remove it from the game inventory, the currentRound state and increment points
  currentPlayer.achievements.push(achievement);
  currentPlayer.victoryPoints += achievement.value;

  game.achievements = game.achievements.filter(
    (a) => a.name !== achievement.name
  );

  game.state.currentRound.achievementsEarned = [];
  game.state.currentRound.movesAvailable =
    game.state.currentRound.movesAvailable.filter((move) => move !== 'achieve');

  // Finalize the round.
  endCurrentPlayerRound(game);

  return true;
};

const tradeDitchLoadForCurrentPlayer = (
  game: IGame,
  contractsToTrade: IContract[],
  cargoToDitch: TCargo[],
  cargoToLoad: TCargo[]
): boolean => {
  // Are there trades to make? Then try to make them
  if (contractsToTrade.length > 0) {
    let success = makeTradesForCurrentPlayer(game, contractsToTrade);
    if (!success) {
      console.log('tradeDitchLoadForCurrentPlayer failed while trading');
      return false;
    }
  }
  // Are there cubes to ditch? Then try to ditch them
  if (cargoToDitch.length > 0) {
    let success = ditchCargoForCurrentPlayer(game, cargoToDitch);
    if (!success) {
      console.log('tradeDitchLoadForCurrentPlayer failed while ditching');
      return false;
    }
  }

  // Are there cubes to load? Then try to load them
  if (cargoToLoad.length > 0) {
    let success = loadCargoForCurrentPlayer(game, cargoToLoad);
    if (!success) {
      console.log('tradeDitchLoadForCurrentPlayer failed while loading');
      return false;
    }
  }

  return true;
};

const updatePlayerTimers = (game: IGame) => {
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

  // How long did the round last?
  const currentTime = new Date().getTime();
  const timeSpentInRound = currentTime - game.state.currentRound.startTime;

  // Update player time, and set the timedOut flag it necessary
  currentPlayer.timeLeft -= timeSpentInRound;
  if (currentPlayer.timeLeft < 0) {
    currentPlayer.hasTimedOut = true;
    currentPlayer.timedOutRound = game.state.round;
  }

  console.log('Updating the timers for ' + currentPlayer.user.name);
};

export const GameEngine = {
  createGame,
  start,
  terminate,
  addPlayerToGame,
  removeUserUuidFromGame,
  sailCurrentPlayerTo,
  loadCargoForCurrentPlayer,
  ditchCargoForCurrentPlayer,
  makeTradesForCurrentPlayer,
  pickAchievementForCurrentPlayer,
  processEndOfRoundAchievements,
  getGameResults,
  tradeDitchLoadForCurrentPlayer,
  updatePlayerTimers,
};
