import { ISession } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class SessionStore {
  private debug: boolean;
  private inMemory: boolean;
  private sessionModel: Model<ISession>;
  private date: Date;
  private sessions?: Map<string, ISession>;

  constructor(
    sessionModel: Model<ISession>,
    options: { debug: boolean; inMemory: boolean } = {
      debug: false,
      inMemory: false,
    }
  ) {
    this.debug = options.debug;
    this.inMemory = options.inMemory;
    this.date = new Date();

    this.inMemory && (this.sessions = new Map());
    this.sessionModel = sessionModel;
  }

  public async saveSession(session: ISession) {
    console.log('Saving session!');

    this.debug && this.saveToFile(session);

    if (this.inMemory) {
      this.sessions?.set(session.email, session);
      return;
    }

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
    if (this.inMemory) {
      return this.sessions?.get(email) || null;
    }

    const foundSession: ISession | null = await this.sessionModel
      .findOne({ email: email }, null, {})
      .exec();

    return foundSession;
  }

  public async getSessions(): Promise<ISession[]> {
    let results: ISession[] = [];

    if (this.inMemory) {
      return Array.from(this.sessions?.values() || []);
    }

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
    fs.writeFile(
      `./saves/${this.date.toISOString()}_${session.email}_session.json`,
      data,
      () => {
        console.log('Session saved to file');
      }
    );
  }
}
