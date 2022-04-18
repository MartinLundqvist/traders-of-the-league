import { IUser, IPlayer, IGame, TPlayerColor, TCargo } from '../types';

type TPlayerColorMap = {
  [key: number]: TPlayerColor;
};

type TPlayerInitialCargoMap = {
  [key: number]: TCargo;
};

const playerColors: TPlayerColorMap = {
  0: 'black',
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'yellow',
};

const playerInitialCargo: TPlayerInitialCargoMap = {
  // 0: Empty. No cargo.
  1: 'yellow',
  2: 'black',
  3: 'green',
  4: 'blue',
};

export const addPlayerToGame = (user: IUser, game: IGame): IPlayer => {
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
