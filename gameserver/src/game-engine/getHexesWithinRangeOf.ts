import { IBoardPosition } from '../../../shared/types';
import { BOARD } from './constants';

export const getHexesWithinRangeOf = (
  position: IBoardPosition
): IBoardPosition[] => {
  const inRangeHexMap = new Map<string, IBoardPosition>();

  const addAdjacentMoves = (newPosition: IBoardPosition) => {
    BOARD.forEach((hex) => {
      let hexPosition: IBoardPosition = { row: hex.row, column: hex.column };
      if (isAdjacent(newPosition, hexPosition))
        inRangeHexMap.set(JSON.stringify(hexPosition), hexPosition);
    });
  };

  // One step
  addAdjacentMoves(position);

  // Two steps
  Array.from(inRangeHexMap.values()).forEach((inRangeHex) =>
    addAdjacentMoves(inRangeHex)
  );

  // Three steps
  Array.from(inRangeHexMap.values()).forEach((inRangeHex) =>
    addAdjacentMoves(inRangeHex)
  );

  return Array.from(inRangeHexMap.values());
};

const isAdjacent = (
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
