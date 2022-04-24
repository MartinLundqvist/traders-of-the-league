import { IPlayer, TCargo } from '../../../shared/types';
import { BOARD, MAX_CARGO } from './constants';

export const ditchingIsAllowed = (
  currentPlayer: IPlayer,
  cargo: TCargo[]
): boolean => {
  // Is the cargo valid?
  let cargoStr = [...cargo].sort().toString();
  let playerCargoStr = [...currentPlayer.cargo].sort().toString();
  if (!playerCargoStr.includes(cargoStr)) {
    console.log(
      'Cargo not valid: ' + cargoStr + ' not part of ' + playerCargoStr
    );
    return false;
  }

  return true;
};
