import { IChat } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class ChatStore {
  private debug: boolean;
  private inMemory: boolean;
  private chatModel: Model<IChat>;
  private date: Date;
  private chats?: Map<string, IChat>;

  constructor(
    chatModel: Model<IChat>,
    options: { debug: boolean; inMemory: boolean } = {
      debug: false,
      inMemory: false,
    }
  ) {
    // this.chats = new Map();
    this.debug = options.debug;
    this.inMemory = options.inMemory;
    this.date = new Date();

    this.inMemory && (this.chats = new Map());
    this.chatModel = chatModel;
  }

  public async saveChat(chat: IChat) {
    this.debug && this.saveToFile(chat);

    if (this.inMemory) {
      this.chats?.set(chat.gameUuid, chat);
      return;
    }

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
    if (this.inMemory) {
      return this.chats?.get(gameUuid) || null;
    }

    const foundChat: IChat | null = await this.chatModel
      .findOne({ gameUuid: gameUuid }, null, {})
      .exec();

    return foundChat;
  }

  public async getChats(): Promise<IChat[]> {
    let results: IChat[] = [];

    if (this.inMemory) {
      return Array.from(this.chats?.values() || []);
    }

    try {
      results = await this.chatModel.find().exec();
    } catch (err) {
      console.log('Error while fetching all chats from mongo');
      console.log(JSON.stringify(err));
      results = [];
    }

    return results;
  }

  public async deleteChats(gameUuids: string[]): Promise<number> {
    if (this.inMemory) {
      gameUuids.forEach((uuid) => this.chats?.delete(uuid));
      return gameUuids.length;
    }

    let results = 0;

    try {
      const { deletedCount } = await this.chatModel
        .deleteMany({ gameUuid: { $in: gameUuids } })
        .exec();
      results = deletedCount;
    } catch (err) {
      console.log('Error while deleting chats from mongo database');
      console.log(JSON.stringify(err));
    }

    return results;
  }

  private saveToFile(chat: IChat) {
    const data = JSON.stringify(chat);
    fs.writeFile(`./saves/${this.date.toISOString()}_chat.json`, data, () => {
      console.log('Game saved to file');
    });
  }
}
