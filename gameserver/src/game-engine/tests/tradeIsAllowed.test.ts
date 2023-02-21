import { ICity, IContract, IPlayer } from '../../../../shared/types';
import { VP_EMPTY_CITY } from '../constants';
import { tradeIsAllowed } from '../tradeIsAllowed';
import { testPlayer, testCity, testContracts } from './testData';

describe('Testing tradeIsAllowed validator', () => {
  test('Pick contract successfully', () => {
    const clonedPlayer: IPlayer = JSON.parse(JSON.stringify(testPlayer));
    const clonedCity: ICity = JSON.parse(JSON.stringify(testCity));
    const oldVPs = clonedPlayer.victoryPoints;
    const oldNrContracts = clonedCity.contracts.length;
    clonedPlayer.cargo = ['black', 'gray', 'yellow', 'blue'];
    const isAllowed = tradeIsAllowed(clonedPlayer, clonedCity, [
      testContracts[0],
    ]);
    expect(isAllowed).toBeTruthy();
    expect(clonedPlayer.victoryPoints).toBe(oldVPs + testContracts[0].value);
    expect(clonedCity.contracts.length).toBe(oldNrContracts - 1);
    expect(clonedPlayer.cargo).toEqual(['black', 'gray']);
  });
  test('Pick two contracts successfully, using a city cube, and empty city', () => {
    const clonedPlayer: IPlayer = JSON.parse(JSON.stringify(testPlayer));
    const clonedCity: ICity = JSON.parse(JSON.stringify(testCity));
    const oldVPs = clonedPlayer.victoryPoints;
    clonedPlayer.cargo = ['red', 'yellow', 'yellow', 'blue', 'gray'];
    const isAllowed = tradeIsAllowed(clonedPlayer, clonedCity, testContracts);
    expect(isAllowed).toBeTruthy();
    expect(clonedPlayer.victoryPoints).toBe(
      oldVPs + testContracts[0].value + testContracts[1].value + VP_EMPTY_CITY
    );
    expect(clonedCity.contracts.length).toBe(0);
    expect(clonedPlayer.cargo).toEqual(['red', 'gray']);
  });
  test('Pick contracts missing cargo', () => {
    const clonedPlayer: IPlayer = JSON.parse(JSON.stringify(testPlayer));
    const clonedCity: ICity = JSON.parse(JSON.stringify(testCity));
    const oldVPs = clonedPlayer.victoryPoints;
    const oldNrContracts = clonedCity.contracts.length;
    clonedPlayer.cargo = ['red', 'yellow', 'yellow', 'yellow'];
    const isAllowed = tradeIsAllowed(clonedPlayer, clonedCity, testContracts);
    expect(isAllowed).toBeFalsy();
    expect(clonedPlayer.victoryPoints).toBe(oldVPs);
    expect(clonedCity.contracts.length).toBe(oldNrContracts);
    expect(clonedPlayer.cargo).toEqual(['red', 'yellow', 'yellow', 'yellow']);
  });
  test('Pick non-existing contract', () => {
    const clonedPlayer: IPlayer = JSON.parse(JSON.stringify(testPlayer));
    const clonedCity: ICity = JSON.parse(JSON.stringify(testCity));
    const oldVPs = clonedPlayer.victoryPoints;
    const oldNrContracts = clonedCity.contracts.length;
    const phoneyContract: IContract = {
      value: 3,
      cargo: ['red', 'yellow'],
      region: 'East',
      uuid: 'E_red_yel_3',
    };
    const isAllowed = tradeIsAllowed(clonedPlayer, clonedCity, [
      phoneyContract,
    ]);
    expect(isAllowed).toBeFalsy();
    expect(clonedPlayer.victoryPoints).toBe(oldVPs);
    expect(clonedCity.contracts.length).toBe(oldNrContracts);
  });
});
