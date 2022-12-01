import { IActiveGame, IGame } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class GameStore {
  private debug: boolean;
  private inMemory: boolean;
  private gameModel: Model<IGame>;
  private date: Date;
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
    this.date = new Date();

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

  public async deleteGames(gameUuids: string[]): Promise<number> {
    if (this.inMemory) {
      gameUuids.forEach((uuid) => this.games?.delete(uuid));
      return gameUuids.length;
    }

    let results = 0;

    try {
      const { deletedCount } = await this.gameModel
        .deleteMany({ uuid: { $in: gameUuids } })
        .exec();
      results = deletedCount;
    } catch (err) {
      console.log('Error while deleting games from mongo database');
      console.log(JSON.stringify(err));
    }

    return results;
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

  public async getActiveGames(): Promise<IActiveGame[]> {
    let results: IActiveGame[] = [];

    if (this.inMemory) {
      const tempResults = Array.from(this.games?.values() || []);

      if (tempResults.length === 0) {
        return [];
      }

      const filteredTempResults = tempResults.filter((game) => {
        game.state.status === 'waiting';
      });

      if (filteredTempResults.length === 0) return [];

      results = filteredTempResults.map((foundGame) => {
        return {
          name: foundGame.name,
          uuid: foundGame.uuid,
          players: foundGame.players,
        };
      });

      return results;
    }

    try {
      results = await this.gameModel
        .find({ 'state.status': 'waiting' }, 'name uuid players')
        .exec();
      // console.log(results);
    } catch (err) {
      console.log('Error while fetching game information from mongo');
      console.log(JSON.stringify(err));
      results = [];
    }

    return results;
  }

  private saveToFile(game: IGame) {
    const data = JSON.stringify(game);
    fs.writeFile(`./saves/${this.date.toISOString()}_game.json`, data, () => {
      console.log('Game saved to file');
    });
  }
}
