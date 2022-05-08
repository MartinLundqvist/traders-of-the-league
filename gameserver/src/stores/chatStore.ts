import { IChat } from '../../../shared/types';
import fs from 'fs';

export class ChatStore {
  private chats: Map<string, IChat>;
  private debug: boolean;

  constructor(debug: boolean = false) {
    this.chats = new Map();
    this.debug = debug;
  }

  public saveChat(chat: IChat): void {
    this.chats.set(chat.gameUuid, chat);
    this.debug && this.saveToFile(chat);
  }

  public getChat(gameUuid: string): IChat | undefined {
    return this.chats.get(gameUuid);
  }

  public getChats(): IChat[] {
    const result = [...this.chats].map((chat) => chat[1]);
    return result;
  }

  private saveToFile(chat: IChat) {
    const data = JSON.stringify(chat);
    fs.writeFile(`./saves/chat_${chat.gameUuid}.json`, data, () => {
      console.log('Game saved to file');
    });
  }
}
