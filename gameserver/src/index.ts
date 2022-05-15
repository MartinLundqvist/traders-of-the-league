import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameSession } from './session';
import { TGameServer } from './types';
import { GameStore } from './stores/gameStore';
import { SessionStore } from './stores/sessionStore';
import { GameEngine } from './game-engine/';
import { MOCK_CHAT, MOCK_GAME, MOCK_SESSIONS } from './game-engine/mockData';
import { ChatStore } from './stores/chatStore';
import { closeDBConnection, connectToDB } from './database';
import { gameModel, sessionModel, chatModel } from './models';

// Persist whether we are in development mode or not
const DEVELOPMENT = process.env.NODE_ENV === 'production' ? false : true;

console.log(
  `Game server initializing in ${
    DEVELOPMENT ? 'development' : 'production'
  } mode.`
);

// Create the global stores
const gameStore = new GameStore(DEVELOPMENT, gameModel);
const sessionStore = new SessionStore(DEVELOPMENT, sessionModel);
const chatStore = new ChatStore(DEVELOPMENT, chatModel);

// Wire up the express server
const app = express();
app.use(cors());

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

// This is merely for health checks. Probably don't even need the express package for this app hmm....
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Ok' });
});

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
    await connectToDB();
    console.log('Connected to database');

    // Add a mock game to the gameStore which we can use for testing purposes
    if (DEVELOPMENT) {
      console.log('Restoring mock game and session');
      await gameStore.saveGame(MOCK_GAME);
      await sessionStore.saveSession(MOCK_SESSIONS[0]);
      await sessionStore.saveSession(MOCK_SESSIONS[1]);
      await chatStore.saveChat(MOCK_CHAT);
    }
  } catch (err) {
    console.log('Error connecting to database');
    console.log(err);
  }
});

// Manage VM operations
process.on('SIGINT', async () => {
  console.log('SIGINT received, closing down server.');
  httpServer.close();
  await closeDBConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing down server.');
  httpServer.close();
  await closeDBConnection();
  process.exit(0);
});
