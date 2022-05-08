import { ISession } from '../../../shared/types';
import fs from 'fs';

export class SessionStore {
  private sessions: Map<string, ISession>;
  private debug: boolean;

  constructor(debug: boolean = false) {
    this.sessions = new Map();
    this.debug = debug;
  }

  public saveSession(session: ISession) {
    this.sessions.set(session.uuid, session);
    this.debug && this.saveToFile(session);
  }

  public getSession(sessionUuid: string): ISession | undefined {
    return this.sessions.get(sessionUuid);
  }

  public removeSession(sessionUuid: string) {
    return this.sessions.delete(sessionUuid);
  }

  public clearGameState(gameUid: string) {
    this.sessions.forEach((session) => {
      if (session.activeGameUuid === gameUid) {
        session.activeGameUuid = '';
      }
    });
  }

  public getSessions(): ISession[] {
    const result = [...this.sessions].map((session) => session[1]);
    return result;
  }

  private saveToFile(session: ISession) {
    const data = JSON.stringify(session);
    fs.writeFile(`./saves/session_${session.uuid}.json`, data, () => {
      console.log('Session saved to file');
    });
  }
}
