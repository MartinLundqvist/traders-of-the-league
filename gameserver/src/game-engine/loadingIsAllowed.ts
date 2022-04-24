import { IPlayer, TCargo } from '../../../shared/types';
import { BOARD, MAX_CARGO } from './constants';

export const loadingIsAllowed = (
  currentPlayer: IPlayer,
  cargo: TCargo[]
): boolean => {
  // Is player in a city?
  const currentHex = BOARD.find(
    (hex) =>
      hex.row === currentPlayer.position.row &&
      hex.column === currentPlayer.position.column
  );

  if (!currentHex || !currentHex.city) {
    console.log('Not in a city');
    return false;
  }

  // Is the cargo valid?
  let cargoStr = [...cargo].sort().toString();
  let cityGoodsStr = [...currentHex.city.goods].sort().toString();
  if (!cityGoodsStr.includes(cargoStr)) {
    console.log(
      'Cargo not valid: ' + cargoStr + ' not part of ' + cityGoodsStr
    );
    return false;
  }

  // Is there space in the player cargo hold?
  if (currentPlayer.cargo.length + cargo.length > MAX_CARGO) {
    console.log('Player does not have space in cargohold');
    return false;
  }

  return true;
};
