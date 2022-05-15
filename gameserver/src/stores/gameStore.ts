import { IGame } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class GameStore {
  // private games: Map<string, IGame>;
  private debug: boolean;
  private gameModel: Model<IGame>;

  constructor(debug: boolean = false, gameModel: Model<IGame>) {
    // this.games = new Map();
    this.debug = debug;
    this.gameModel = gameModel;
  }

  public async saveGame(game: IGame) {
    // this.games.set(game.uuid, game);
    this.debug && this.saveToFile(game);

    // console.log(this.gameModel.db);
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
    const foundGame: IGame | null = await this.gameModel
      .findOne({ uuid: gameUuid }, null, {})
      .exec();

    return foundGame;

    // return this.games.get(gameUuid);
  }

  public async getGames(): Promise<IGame[]> {
    let results: IGame[] = [];

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
