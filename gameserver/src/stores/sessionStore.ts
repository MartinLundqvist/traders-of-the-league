import { ISession } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class SessionStore {
  private debug: boolean;
  private sessionModel: Model<ISession>;

  constructor(debug: boolean = false, sessionModel: Model<ISession>) {
    this.debug = debug;
    this.sessionModel = sessionModel;
  }

  public async saveSession(session: ISession) {
    console.log('Saving session!');

    this.debug && this.saveToFile(session);

    try {
      await this.sessionModel
        .replaceOne({ email: session.email }, session, { upsert: true })
        .exec();
    } catch (err) {
      console.log('Error while replacing session in mongo database');
      console.log(JSON.stringify(err));
    }
  }

  public async getSession(email: string): Promise<ISession | null> {
    const foundSession: ISession | null = await this.sessionModel
      .findOne({ email: email }, null, {})
      .exec();

    return foundSession;
  }

  public async getSessions(): Promise<ISession[]> {
    let results: ISession[] = [];

    try {
      results = await this.sessionModel.find().exec();
    } catch (err) {
      console.log('Error while fetching all games from mongo');
      console.log(JSON.stringify(err));
      results = [];
    }

    return results;
  }

  private saveToFile(session: ISession) {
    const data = JSON.stringify(session);
    fs.writeFile(`./saves/session_${session.uuid}.json`, data, () => {
      console.log('Session saved to file');
    });
  }
}
