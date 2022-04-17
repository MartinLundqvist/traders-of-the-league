import { IBoardPosition } from '../types';
import { BOARD } from '../constants';

/**
 * Checks whether a board position is adjacent
 * @param currentPosition
 * @param newPosition
 * @returns false or true
 */
export const isAdjacent = (
  currentPosition: IBoardPosition,
  newPosition: IBoardPosition
): boolean => {
  // Remember, even columns contain odd rows and vice versa!!
  // We assume that the incoming positions all exist on the board!!

  // Check if the move is one valid row step in the same column
  if (newPosition.column === currentPosition.column) {
    return (
      newPosition.row === currentPosition.row + 2 ||
      newPosition.row === currentPosition.row - 2
    );
  }

  // Check if the move is one valid column step to an adjacent row
  if (
    newPosition.column === currentPosition.column + 1 ||
    newPosition.column === currentPosition.column - 1
  ) {
    return (
      newPosition.row === currentPosition.row + 1 ||
      newPosition.row === currentPosition.row - 1
    );
  }

  return false;
};

export const moveIsAllowed = (
  currentPosition: IBoardPosition,
  newPosition: IBoardPosition
): boolean => {
  // Check if the newPosition is contained within adjacent movees
  let result = allowedMoves(3, currentPosition).find(
    (move) => move.column === newPosition.column && move.row === newPosition.row
  );

  if (result) {
    return true;
  }

  return false;
};

// TODO: This is NOT optimized by any stretch of the imaginations. But it works...
export const allowedMoves = (
  steps: number,
  currentPosition: IBoardPosition
): IBoardPosition[] => {
  //   console.time('allowedMoves');

  // One step from currentPosition
  let oneStepAdjacentPositions = adjacentMoves(currentPosition);
  if (steps === 1) return oneStepAdjacentPositions;

  let twoStepsAdjacentPositions: IBoardPosition[] = [];

  // Two steps from current position - this array will become unnecessarily big, but that's OK
  oneStepAdjacentPositions.forEach((result) => {
    twoStepsAdjacentPositions = [
      ...twoStepsAdjacentPositions,
      ...adjacentMoves(result),
    ];
  });

  if (steps === 2)
    return [...oneStepAdjacentPositions, ...twoStepsAdjacentPositions];

  // ...and three steps from current position...
  let threeStepsAdjacentPositions: IBoardPosition[] = [];

  twoStepsAdjacentPositions.forEach((result) => {
    threeStepsAdjacentPositions = [
      ...threeStepsAdjacentPositions,
      ...adjacentMoves(result),
    ];
  });

  //   console.timeEnd('allowedMoves');

  if (steps === 3)
    return [
      ...oneStepAdjacentPositions,
      ...twoStepsAdjacentPositions,
      ...threeStepsAdjacentPositions,
    ];

  return [];
};

export const adjacentMoves = (
  currentPosition: IBoardPosition
): IBoardPosition[] => {
  let results: IBoardPosition[] = [];

  // Create the array of all adjacent board positions
  BOARD.forEach((hexagon) => {
    const hexPosition: IBoardPosition = {
      column: hexagon.column,
      row: hexagon.row,
    };
    if (isAdjacent(currentPosition, hexPosition)) {
      results.push(hexPosition);
    }
  });

  return results;
};
