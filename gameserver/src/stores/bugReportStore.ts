import { IBugReport } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class BugReportStore {
  private debug: boolean;
  private bugReportModel: Model<IBugReport>;

  constructor(debug: boolean = false, bugReportModel: Model<IBugReport>) {
    // this.chats = new Map();
    this.debug = debug;
    this.bugReportModel = bugReportModel;
  }

  public async saveBugReport(report: IBugReport) {
    // this.chats.set(chat.gameUuid, chat);
    this.debug && this.saveToFile(report);

    try {
      await this.bugReportModel.create(report);
    } catch (err) {
      console.log('Error while creating bug report in mongo database');
      console.log(JSON.stringify(err));
    }
  }

  public async getBugReports(): Promise<IBugReport[]> {
    let results: IBugReport[] = [];

    try {
      results = await this.bugReportModel.find().exec();
    } catch (err) {
      console.log('Error while fetching all bug reports from mongo');
      console.log(JSON.stringify(err));
      results = [];
    }

    return results;
  }

  private saveToFile(report: IBugReport) {
    const data = JSON.stringify(report);
    fs.writeFile(`./saves/bugReport_${report.date}.json`, data, () => {
      console.log('Report saved to file');
    });
  }
}
