import { IBoardPosition } from '../../../shared/types';

export const HEX_MAX_DIAMETER = 110;
export const HEX_MIN_DIAMETER = (HEX_MAX_DIAMETER * Math.sqrt(3)) / 2;
export const HEX_SIDE_LENGTH = HEX_MAX_DIAMETER / Math.sqrt(3);
export const HEX_TOP_OFFSET = HEX_MIN_DIAMETER - 2;
export const HEX_LEFT_OFFSET = (HEX_MAX_DIAMETER + HEX_SIDE_LENGTH) / 2 - 6;

export const getLeftForBoardPosition = (position: IBoardPosition): number => {
  return position.column * HEX_LEFT_OFFSET;
};

export const getTopForBoardPosition = (position: IBoardPosition): number => {
  return (position.row * HEX_TOP_OFFSET) / 2;
};
