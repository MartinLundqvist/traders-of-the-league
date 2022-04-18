import { IGame } from '../../../shared/types';

export class GameStore {
  private games: Map<string, IGame>;

  constructor() {
    this.games = new Map();
  }

  public saveGame(game: IGame): void {
    this.games.set(game.uuid, game);
  }

  public getGame(gameUuid: string): IGame | undefined {
    return this.games.get(gameUuid);
  }
}
