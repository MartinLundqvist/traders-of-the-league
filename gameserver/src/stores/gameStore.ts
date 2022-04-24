import { IGame } from '../../../shared/types';
import fs from 'fs';

export class GameStore {
  private games: Map<string, IGame>;
  private debug: boolean;

  constructor(debug: boolean = false) {
    this.games = new Map();
    this.debug = debug;
  }

  public saveGame(game: IGame): void {
    this.games.set(game.uuid, game);
    this.debug && this.saveToFile(game);
  }

  public getGame(gameUuid: string): IGame | undefined {
    return this.games.get(gameUuid);
  }

  private saveToFile(game: IGame) {
    const data = JSON.stringify(game);
    fs.writeFile(`./saves/game_${game.uuid}.json`, data, () => {
      console.log('Game saved to file');
    });
  }
}
