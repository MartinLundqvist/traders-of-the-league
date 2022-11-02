import mongoose from 'mongoose';
import {
  IBugReport,
  IChat,
  IGame,
  ISession,
  IRanking,
  IAchievement,
} from '../../../shared/types';

const rankingSchema = new mongoose.Schema<IRanking>({
  user: {
    name: String,
    uuid: String,
  },
  currentRanking: Number,
  rankingHistory: [
    {
      gameUuid: String,
      newRanking: Number,
    },
  ],
});

const achievementSchema = new mongoose.Schema<IAchievement>({
  name: String,
  description: String,
  value: Number,
  target: Number,
  uuid: String,
});

const gameSchema = new mongoose.Schema<IGame>({
  name: String,
  uuid: String,
  startTime: Number,
  endTime: Number,
  players: [
    {
      color: String,
      user: {
        name: String,
        uuid: String,
        connected: Boolean,
      },
      contractsFulfilled: [
        {
          value: Number,
          cargo: [String],
          region: String,
          uuid: String,
        },
      ],
      citiesEmptied: [
        {
          name: String,
          value: Number,
        },
      ],
      achievements: [achievementSchema],
      achievementsProgress: [
        {
          uuid: String,
          target: Number,
          progress: Number,
        },
      ],
      position: {
        column: Number,
        row: Number,
      },
      victoryPoints: Number,
      cargo: [String],
      hasMadeEndGameMove: Boolean,
    },
  ],
  numberOfCitiesToEmpty: Number,
  board: [
    {
      city: {
        type: {
          name: String,
          goods: [String],
          nrContracts: Number,
          contracts: [
            {
              value: Number,
              cargo: [String],
              region: String,
              uuid: String,
            },
          ],
          coatOfArms: String,
          region: String,
        },
        required: false,
      },
      column: Number,
      row: Number,
    },
  ],
  state: {
    status: String,
    round: Number,
    currentRound: {
      playerUuid: String,
      movesLeft: Number,
      movesAvailable: [String],
      hexesWithinRange: [
        {
          row: Number,
          column: Number,
        },
      ],
      achievementsEarned: [achievementSchema],
    },
    numberOfCitiesEmptied: Number,
  },
  achievements: [achievementSchema],
});

const sessionSchema = new mongoose.Schema<ISession>({
  uuid: String,
  user: {
    name: String,
    uuid: String,
    connected: Boolean,
  },
  email: String,
  activeGameUuid: String,
});

const chatSchema = new mongoose.Schema<IChat>({
  gameUuid: String,
  messages: [
    {
      uuid: String,
      from: {
        name: String,
        uuid: String,
        connected: Boolean,
      },
      message: String,
    },
  ],
});

const bugReportSchema = new mongoose.Schema<IBugReport>({
  date: Date,
  email: String,
  userReport: {
    action: String,
    bug: String,
    expectation: String,
    priority: String,
  },
  game: gameSchema,
});

export const gameModel = mongoose.model('Game', gameSchema);
export const sessionModel = mongoose.model('Session', sessionSchema);
export const chatModel = mongoose.model('Chat', chatSchema);
export const bugReportModel = mongoose.model('BugReport', bugReportSchema);
export const rankgingModel = mongoose.model('Ranking', rankingSchema);
