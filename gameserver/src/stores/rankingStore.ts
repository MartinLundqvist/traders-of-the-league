import { IRanking } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class RankingStore {
  private debug: boolean;
  private inMemory: boolean;
  private rankingModel: Model<IRanking>;
  // private date: Date;
  private rankings?: Map<string, IRanking>;

  constructor(
    rankingModel: Model<IRanking>,
    options: { debug: boolean; inMemory: boolean } = {
      debug: false,
      inMemory: false,
    }
  ) {
    this.debug = options.debug;
    this.inMemory = options.inMemory;
    // this.date = new Date();

    this.inMemory && (this.rankings = new Map());
    this.rankingModel = rankingModel;
  }

  public async saveRanking(ranking: IRanking) {
    console.log('Saving new ranking!');

    this.debug && this.saveToFile(ranking);

    if (this.inMemory) {
      this.rankings?.set(ranking.user.uuid, ranking);
      return;
    }

    try {
      await this.rankingModel
        .replaceOne({ 'user.uuid': ranking.user.uuid }, ranking, {
          upsert: true,
        })
        .exec();
    } catch (err) {
      console.log('Error while replacing ranking in mongo database');
      console.log(JSON.stringify(err));
    }
  }

  public async getAllRankings(): Promise<IRanking[]> {
    let results: IRanking[] = [];

    if (this.inMemory) {
      return Array.from(this.rankings?.values() || []);
    }

    try {
      results = await this.rankingModel
        .find()
        .sort({ currentRanking: -1 })
        .exec();
    } catch (err) {
      console.log('Error while fetching all rankings from mongo');
      console.log(JSON.stringify(err));
      results = [];
    }

    return results;
  }

  public async getNamedRankings(playerUuids: string[]): Promise<IRanking[]> {
    let results: IRanking[] = [];

    if (this.inMemory) {
      throw new Error('In memory version of getNamedRankings not implemented!');
    }

    try {
      results = await this.rankingModel
        .find()
        .where('user.uuid')
        .in(playerUuids)
        .exec();
    } catch (err) {
      console.log('Error while fetching all rankings from mongo');
      console.log(JSON.stringify(err));
      results = [];
    }

    return results;
  }

  private saveToFile(ranking: IRanking) {
    const data = JSON.stringify(ranking);
    fs.writeFile(
      `./saves/${new Date().toISOString()}_Ranking.json`,
      data,
      () => {
        console.log('Ranking saved to file');
      }
    );
  }
}
