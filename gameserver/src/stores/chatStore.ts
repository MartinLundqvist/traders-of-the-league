import { IChat } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class ChatStore {
  // private chats: Map<string, IChat>;
  private debug: boolean;
  private chatModel: Model<IChat>;

  constructor(debug: boolean = false, chatModel: Model<IChat>) {
    // this.chats = new Map();
    this.debug = debug;
    this.chatModel = chatModel;
  }

  public async saveChat(chat: IChat) {
    // this.chats.set(chat.gameUuid, chat);
    this.debug && this.saveToFile(chat);

    try {
      await this.chatModel
        .replaceOne({ gameUuid: chat.gameUuid }, chat, { upsert: true })
        .exec();
    } catch (err) {
      console.log('Error while replacing chat in mongo database');
      console.log(JSON.stringify(err));
    }
  }

  public async getChat(gameUuid: string): Promise<IChat | null> {
    const foundChat: IChat | null = await this.chatModel
      .findOne({ gameUuid: gameUuid }, null, {})
      .exec();

    return foundChat;
    // return this.chats.get(gameUuid);
  }

  public async getChats(): Promise<IChat[]> {
    let results: IChat[] = [];

    try {
      results = await this.chatModel.find().exec();
    } catch (err) {
      console.log('Error while fetching all chats from mongo');
      console.log(JSON.stringify(err));
      results = [];
    }

    return results;
  }

  private saveToFile(chat: IChat) {
    const data = JSON.stringify(chat);
    fs.writeFile(`./saves/chat_${chat.gameUuid}.json`, data, () => {
      console.log('Game saved to file');
    });
  }
}
