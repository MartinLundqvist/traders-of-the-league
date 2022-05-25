import { IBugReport } from '../../../shared/types';
import fs from 'fs';
import { Model } from 'mongoose';

export class BugReportStore {
  private debug: boolean;
  private inMemory: boolean;
  private bugReportModel: Model<IBugReport>;
  private date: Date;
  private bugReports?: Map<string, IBugReport>;

  constructor(
    bugReportModel: Model<IBugReport>,
    options: { debug: boolean; inMemory: boolean } = {
      debug: false,
      inMemory: false,
    }
  ) {
    this.debug = options.debug;
    this.inMemory = options.inMemory;
    this.date = new Date();

    this.inMemory && (this.bugReports = new Map());
    this.bugReportModel = bugReportModel;
  }

  public async saveBugReport(report: IBugReport) {
    console.log('Saving bug report!');

    this.debug && this.saveToFile(report);

    if (this.inMemory) {
      this.bugReports?.set(report.date.toString(), report);
      return;
    }

    try {
      await this.bugReportModel.create(report);
    } catch (err) {
      console.log('Error while creating bug report in mongo database');
      console.log(JSON.stringify(err));
    }
  }

  public async getBugReports(): Promise<IBugReport[]> {
    let results: IBugReport[] = [];

    if (this.inMemory) {
      return Array.from(this.bugReports?.values() || []);
    }

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
    fs.writeFile(
      `./saves/${this.date.toISOString()}_bugReport.json`,
      data,
      () => {
        console.log('Report saved to file');
      }
    );
  }
}
