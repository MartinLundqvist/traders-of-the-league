import { IBoardPosition } from '../../../shared/types';

// Don't change from 110!
export const HEX_MAX_DIAMETER = 110;
export const HEX_MIN_DIAMETER = (HEX_MAX_DIAMETER * Math.sqrt(3)) / 2;
export const HEX_SIDE_LENGTH = HEX_MAX_DIAMETER / Math.sqrt(3);
export const HEX_TOP_OFFSET = HEX_MIN_DIAMETER - 2;
export const HEX_LEFT_OFFSET = (HEX_MAX_DIAMETER + HEX_SIDE_LENGTH) / 2 - 6;
export const CONTRACT_HEIGHT = 29;
export const BOARD_WIDTH = 12 * HEX_LEFT_OFFSET + HEX_SIDE_LENGTH / 2;
export const BOARD_HEIGHT = 5 * HEX_MIN_DIAMETER;
export const BOARD_TOP_BOTTOM_PADDING = CONTRACT_HEIGHT;

export const getLeftForBoardPosition = (position: IBoardPosition): number => {
  return position.column * HEX_LEFT_OFFSET;
};

export const getTopForBoardPosition = (position: IBoardPosition): number => {
  return (position.row * HEX_TOP_OFFSET) / 2;
};
