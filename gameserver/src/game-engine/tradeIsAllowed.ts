import { ICity, IContract, IPlayer, TCargo } from '../../../shared/types';
import { VP_EMPTY_CITY } from './constants';

export const tradeIsAllowed = (
  currentPlayer: IPlayer,
  currentCity: ICity,
  contracts: IContract[]
): boolean => {
  // We first loop through the contracts and make a mock trade to see it can be executed.
  // For the mock objects, we need to do deep clones.
  const mockPlayer: IPlayer = JSON.parse(JSON.stringify(currentPlayer));
  const mockCity: ICity = JSON.parse(JSON.stringify(currentCity));
  const validTrades: boolean[] = [];

  contracts.forEach((contract) => {
    if (
      fulfillOneGood(contract.cargo[0], mockPlayer, mockCity) &&
      fulfillOneGood(contract.cargo[1], mockPlayer, mockCity)
    ) {
      validTrades.push(true);
      mockPlayer.contractsFulfilled.push(contract);
      mockPlayer.victoryPoints += contract.value;

      mockCity.contracts = mockCity.contracts.filter(
        (c) => c.uuid != contract.uuid
      );
    } else {
      validTrades.push(false);
    }
  });

  // If all trades were succesfully completed, we will mutate the actual game using the mock trade.
  if (validTrades.every((trade) => trade === true)) {
    // Mutate player and city objects with mocks (this removes goods and contracts)
    // console.log('All trades were successful');

    currentPlayer.cargo = [...mockPlayer.cargo];
    currentPlayer.contractsFulfilled = mockPlayer.contractsFulfilled.map(
      (c) => {
        return { ...c };
      }
    );
    currentPlayer.victoryPoints = mockPlayer.victoryPoints;

    currentCity.contracts = mockCity.contracts.map((c) => {
      return { ...c };
    });

    // If this emptied the city, add to the citiesEmptied array and add more VPs
    if (currentCity.contracts.length === 0) {
      currentPlayer.citiesEmptied.push({
        name: currentCity.name,
        value: VP_EMPTY_CITY,
      });

      currentPlayer.victoryPoints += VP_EMPTY_CITY;
    }

    return true;
  }

  return false;
};

const fulfillOneGood = (
  cargo: TCargo,
  player: IPlayer,
  city: ICity
): boolean => {
  // First try and fulfill from the city
  if (city.goods.includes(cargo)) return true;

  // Second try and fulfill from the cargo hold
  if (player.cargo.includes(cargo)) {
    let itemIndexToLoad = player.cargo.findIndex((g) => g === cargo);
    player.cargo.splice(itemIndexToLoad, 1);
    return true;
  }

  return false;
};
