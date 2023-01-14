import express, {
  NextFunction,
  Response,
  Request,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameSession } from './session';
import { TGameServer } from './types';
import { GameStore } from './stores/gameStore';
import { SessionStore } from './stores/sessionStore';
import { BugReportStore } from './stores/bugReportStore';
import {
  MOCK_CHAT,
  MOCK_CHAT_ACHIEVEMENTS,
  MOCK_GAME,
  MOCK_GAME_ACHIEVEMENTS,
  MOCK_SESSIONS,
  MOCK_SESSIONS_ACHIEVEMENTS,
} from './game-engine/mockData';
import { ChatStore } from './stores/chatStore';
import { closeDBConnection, connectToDB } from './database';
import {
  gameModel,
  sessionModel,
  chatModel,
  bugReportModel,
  rankingModel,
} from './models';
import {
  createErrorHandler,
  createGameAPIRoutes,
  createProtectedRoutes,
  createRoutes,
} from './routes';
import { RankingStore } from './stores/rankingStore';

// Persist whether we are in development mode or not, and whether we are starting up only an in-memory version
const DEVELOPMENT = process.env.NODE_ENV === 'production' ? false : true;
const IN_MEMORY = process.env.IN_MEMORY === 'true' ? true : false;

console.log(
  `Game server initializing in ${DEVELOPMENT ? 'development' : 'production'} ${
    IN_MEMORY ? 'and in_memory ' : ''
  }mode.`
);

// Create the global stores
const gameStore = new GameStore(gameModel, {
  debug: false,
  inMemory: IN_MEMORY,
});
const sessionStore = new SessionStore(sessionModel, {
  debug: false,
  inMemory: IN_MEMORY,
});
const chatStore = new ChatStore(chatModel, {
  debug: false,
  inMemory: IN_MEMORY,
});
const bugReportStore = new BugReportStore(bugReportModel, {
  debug: false,
  inMemory: IN_MEMORY,
});
const rankingStore = new RankingStore(rankingModel, {
  debug: false,
  inMemory: IN_MEMORY,
});

// Wire up the express server
const app = express();
app.use(cors());
app.use(express.json());

// Configure and wire up the normal game play API routes
app.use(
  '/',
  createRoutes(gameStore, sessionStore, chatStore, bugReportStore, rankingStore)
);

// Configure and wire up rest API for the game server in case we are in AI mode.
if (IN_MEMORY)
  app.use('/gameapi', createGameAPIRoutes(sessionStore, gameStore));

app.use(
  '/protected',
  createProtectedRoutes(
    gameStore,
    sessionStore,
    chatStore,
    bugReportStore,
    rankingStore
  )
);

// app.use(createErrorHandler());

// Set up the HTTP Server and connect it to the express app
const httpServer = createServer(app);
const io = new Server<TGameServer>(httpServer, {
  cors: {
    origin: '*', // TODO: Review whether this is really a good idea...
  },
});

// Listen for connections to the socket, and create an GameSession object for each connection
io.on('connection', (socket) => {
  new GameSession(io, socket, sessionStore, gameStore, chatStore, rankingStore);
});

// Start the server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, async () => {
  console.log('Server started on port ' + PORT.toString());
  console.log('Current working directory is ' + process.cwd());

  try {
    if (!IN_MEMORY) {
      await connectToDB();
      console.log('Connected to database');
    }
  } catch (err) {
    console.log('Error connecting to database');
    console.log(err);
  }

  // Add a mock game to the gameStore which we can use for testing purposes
  if (DEVELOPMENT) {
    console.log('Restoring mock game and session');
    await gameStore.saveGame(MOCK_GAME_ACHIEVEMENTS);
    for (const session of MOCK_SESSIONS_ACHIEVEMENTS) {
      await sessionStore.saveSession(session);
    }
    await chatStore.saveChat(MOCK_CHAT_ACHIEVEMENTS);
  }
});

// Manage VM operations
process.on('SIGINT', async () => {
  console.log('SIGINT received, closing down server.');
  httpServer.close();
  if (!IN_MEMORY) await closeDBConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing down server.');
  httpServer.close();
  if (!IN_MEMORY) await closeDBConnection();
  process.exit(0);
});
