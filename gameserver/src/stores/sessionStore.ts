import { ISession } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class SessionStore {
  // private sessions: Map<string, ISession>;
  private debug: boolean;
  private sessionModel: Model<ISession>;

  constructor(debug: boolean = false, sessionModel: Model<ISession>) {
    // this.sessions = new Map();
    this.debug = debug;
    this.sessionModel = sessionModel;
  }

  public async saveSession(session: ISession) {
    // this.sessions.set(session.uuid, session);
    this.debug && this.saveToFile(session);

    try {
      await this.sessionModel
        .replaceOne({ uuid: session.uuid }, session, { upsert: true })
        .exec();
    } catch (err) {
      console.log('Error while replacing session in mongo database');
      console.log(JSON.stringify(err));
    }
  }

  public async getSession(sessionUuid: string): Promise<ISession | null> {
    const foundSession: ISession | null = await this.sessionModel
      .findOne({ uuid: sessionUuid }, null, {})
      .exec();

    return foundSession;
    // return this.sessions.get(sessionUuid);
  }

  // public removeSession(sessionUuid: string) {
  //   return this.sessions.delete(sessionUuid);
  // }

  // public clearGameState(gameUid: string) {
  //   this.sessions.forEach((session) => {
  //     if (session.activeGameUuid === gameUid) {
  //       session.activeGameUuid = '';
  //     }
  //   });
  // }

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
