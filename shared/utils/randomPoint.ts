import { TVictoryPoint } from '../types';

export const randomPoint = (): TVictoryPoint => {
  // min and max included
  return Math.floor(Math.random() * 5 + 1) as TVictoryPoint;
};
