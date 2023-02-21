import { loadingIsAllowed } from '../loadingIsAllowed';
import { testPlayer } from './testData';

describe('Testing loadingIsAllowed validator', () => {
  test('Player picks both cargo', () => {
    const isAllowed = loadingIsAllowed(testPlayer, ['gray', 'black']);
    expect(isAllowed).toBeTruthy();
  });
  test('Player picks cargo not in the city ', () => {
    const isAllowed = loadingIsAllowed(testPlayer, ['gray', 'red']);
    expect(isAllowed).toBeFalsy();
  });
  test('Player picks no cargo', () => {
    const isAllowed = loadingIsAllowed(testPlayer, []);
    expect(isAllowed).toBeTruthy();
  });
  test('Player has no room', () => {
    const clonedPlayer = JSON.parse(JSON.stringify(testPlayer));
    clonedPlayer.cargo = ['black', 'black', 'black', 'black'];
    const isAllowed = loadingIsAllowed(clonedPlayer, ['gray', 'black']);
    expect(isAllowed).toBeFalsy();
  });
  test('Player is not in a city', () => {
    const clonedPlayer = JSON.parse(JSON.stringify(testPlayer));
    clonedPlayer.position.row = 1;
    clonedPlayer.position.column = 1;
    const isAllowed = loadingIsAllowed(clonedPlayer, ['gray']);
    expect(isAllowed).toBeFalsy();
  });
});
