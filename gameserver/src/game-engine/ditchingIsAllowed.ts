import { IPlayer, TCargo } from '../../../shared/types';

export const ditchingIsAllowed = (
  currentPlayer: IPlayer,
  cargo: TCargo[]
): boolean => {
  // Get a copy of the player cargo
  const playerCargo = [...currentPlayer.cargo];
  let valid: boolean[] = [];

  cargo.forEach((c) => {
    let index = playerCargo.findIndex((pc) => pc === c);
    if (index > -1) {
      playerCargo.splice(index, 1);
      valid.push(true);
    }
  });

  if (valid.length === cargo.length && valid.every((e) => e)) return true;

  console.log(
    'Cargo not valid: ' +
      cargo.toString() +
      ' not part of ' +
      currentPlayer.cargo.toString()
  );

  return false;
};
