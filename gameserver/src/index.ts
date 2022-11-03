import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameSession } from './session';
import { TGameServer } from './types';
import { GameStore } from './stores/gameStore';
import { SessionStore } from './stores/sessionStore';
import { BugReportStore } from './stores/bugReportStore';
import { GameEngine } from './game-engine/';
import { MOCK_CHAT, MOCK_GAME, MOCK_SESSIONS } from './game-engine/mockData';
import { ChatStore } from './stores/chatStore';
import { closeDBConnection, connectToDB } from './database';
import { gameModel, sessionModel, chatModel, bugReportModel } from './models';
import { createRestAPIRoutes } from './restapiroutes';
import { resendVerificationEmail } from './auth-controllers/resendVerificationEmail';

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

// Wire up the express server
const app = express();
app.use(cors());
app.use(express.json());

// This route gets information about all games
app.get('/games', async (req, res) => {
  const games = await gameStore.getGames();

  const results = games.map((game) => {
    return {
      name: game.name,
      uuid: game.uuid,
      status: game.state.status,
    };
  });

  res.status(200).send(results);
});

// This route gets information about all sessions
app.get('/sessions', async (req, res) => {
  const sessions = await sessionStore.getSessions();

  const results = sessions.map((session) => {
    return {
      user: session.user,
      uuid: session.user.uuid,
    };
  });

  res.status(200).send(results);
});

// This route gets information about all chats
app.get('/chats', async (req, res) => {
  const chats = await chatStore.getChats();

  const results = chats.map((chat) => {
    return {
      uuid: chat.gameUuid,
      nrMessages: chat.messages.length,
    };
  });

  res.status(200).send(results);
});

// This route gets the complete list of won games
app.get('/wongames', async (req, res) => {
  const games = await gameStore.getGames();

  const results = games.filter((game) => game.state.status === 'won');

  res.status(200).send(results);
});

// This route gets game results for a gameUuid
app.get('/gameresults/:gameUuid', async (req, res) => {
  const gameUuid = req.params.gameUuid;

  const game = await gameStore.getGame(gameUuid);

  if (!game) {
    res.status(500).send({ message: 'Game not found' });
    return;
  }

  const results = GameEngine.getGameResults(game);

  res.status(200).send({ message: 'Game found', results });
});

// This route posts a bugreport
app.post('/postbugreport', async (req, res) => {
  try {
    await bugReportStore.saveBugReport(req.body);
  } catch (err) {
    console.log('Error saving bugreport');
    console.log(err);
    res.status(500).send({ message: 'Error saving bugreport' });
  }

  res.status(200).send({ message: 'Report posted' });
});

// This route gets all bugreports
app.get('/bugreports', async (req, res) => {
  const reports = await bugReportStore.getBugReports();

  res.status(200).send(reports);
});

// This route gets all active games
app.get('/activegames', async (req, res) => {
  const games = await gameStore.getActiveGames();

  res.status(200).send(games);
});

// This route asks Auth0 to resend a verification email
app.get('/resendemail/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  const result = await resendVerificationEmail(user_id);

  res
    .status(200)
    .send({ message: 'Verification email sent: ', success: result });
});

// This is merely for health checks. Probably don't even need the express package for this app hmm....
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Ok' });
});

// Configure and wire up rest API for the game server in case we are in AI mode.
if (IN_MEMORY)
  app.use('/gameapi', createRestAPIRoutes(sessionStore, gameStore));

// Set up the HTTP Server and connect it to the express app
const httpServer = createServer(app);
const io = new Server<TGameServer>(httpServer, {
  cors: {
    origin: '*', // TODO: Review whether this is really a good idea...
  },
});

// Listen for connections to the socket, and create an GameSession object for each connection
io.on('connection', (socket) => {
  new GameSession(io, socket, sessionStore, gameStore, chatStore);
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
    await gameStore.saveGame(MOCK_GAME);
    await sessionStore.saveSession(MOCK_SESSIONS[0]);
    await sessionStore.saveSession(MOCK_SESSIONS[1]);
    await chatStore.saveChat(MOCK_CHAT);
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
