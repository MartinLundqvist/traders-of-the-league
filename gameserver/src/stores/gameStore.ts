import { IGame } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class GameStore {
  private debug: boolean;
  private inMemory: boolean;
  private gameModel: Model<IGame>;
  private games?: Map<string, IGame>;

  constructor(
    gameModel: Model<IGame>,
    options: { debug: boolean; inMemory: boolean } = {
      debug: false,
      inMemory: false,
    }
  ) {
    // this.games = new Map();
    this.debug = options.debug;
    this.inMemory = options.inMemory;

    this.inMemory && (this.games = new Map());
    this.gameModel = gameModel;
  }

  public async saveGame(game: IGame) {
    this.debug && this.saveToFile(game);

    if (this.inMemory) {
      this.games?.set(game.uuid, game);
      return;
    }

    try {
      await this.gameModel
        .replaceOne({ uuid: game.uuid }, game, { upsert: true })
        .exec();
    } catch (err) {
      console.log('Error while replacing game in mongo database');
      console.log(JSON.stringify(err));
    }
  }

  public async getGame(gameUuid: string): Promise<IGame | null> {
    if (this.inMemory) {
      return this.games?.get(gameUuid) || null;
    }

    const foundGame: IGame | null = await this.gameModel
      .findOne({ uuid: gameUuid }, null, {})
      .exec();

    return foundGame;
  }

  public async getGames(): Promise<IGame[]> {
    let results: IGame[] = [];

    if (this.inMemory) {
      return Array.from(this.games?.values() || []);
    }

    try {
      results = await this.gameModel.find().exec();
    } catch (err) {
      console.log('Error while fetching all games from mongo');
      console.log(JSON.stringify(err));
      results = [];
    }

    return results;
  }

  private saveToFile(game: IGame) {
    const data = JSON.stringify(game);
    fs.writeFile(`./saves/game_${game.uuid}.json`, data, () => {
      console.log('Game saved to file');
    });
  }
}
