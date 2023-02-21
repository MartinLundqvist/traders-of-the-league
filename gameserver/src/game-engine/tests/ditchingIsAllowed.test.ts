import { ditchingIsAllowed } from '../ditchingIsAllowed';
import { testPlayer } from './testData';

describe('Testing ditchingIsAllowed validator', () => {
  test('Two valid cargos', () => {
    const isAllowed = ditchingIsAllowed(testPlayer, ['gray', 'black']);
    expect(isAllowed).toBeTruthy();
  });
  test('One valid cargo', () => {
    const isAllowed = ditchingIsAllowed(testPlayer, ['gray']);
    expect(isAllowed).toBeTruthy();
  });
  test('Two similar cargo, of which there is only one', () => {
    const isAllowed = ditchingIsAllowed(testPlayer, ['gray', 'gray']);
    expect(isAllowed).toBeFalsy();
  });
  test('One valid and one invalid cargo', () => {
    const isAllowed = ditchingIsAllowed(testPlayer, ['gray', 'red']);
    expect(isAllowed).toBeFalsy();
  });
  test('Three invalid cargo', () => {
    const isAllowed = ditchingIsAllowed(testPlayer, ['red', 'red', 'yellow']);
    expect(isAllowed).toBeFalsy();
  });
  test('Empty cargo - it is ok to ditch nothing', () => {
    const isAllowed = ditchingIsAllowed(testPlayer, []);
    expect(isAllowed).toBeTruthy();
  });
});
