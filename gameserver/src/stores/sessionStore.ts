import { ISession } from '../../../shared/types';

export class SessionStore {
  private sessions: Map<string, ISession>;

  constructor() {
    this.sessions = new Map();
  }

  public saveSession(session: ISession) {
    this.sessions.set(session.uuid, session);
  }

  public getSession(sessionUuid: string): ISession | undefined {
    return this.sessions.get(sessionUuid);
  }

  public removeSession(sessionUuid: string) {
    return this.sessions.delete(sessionUuid);
  }
}
