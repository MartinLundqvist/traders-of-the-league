import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameSession } from './session';
import { TGameServer } from './types';
import { GameStore } from './stores/gameStore';
import { SessionStore } from './stores/sessionStore';
import { MOCK_GAME, MOCK_SESSIONS } from './game-engine/mockData';

// Persist whether we are in development mode or not
const DEVELOPMENT = process.env.NODE_ENV === 'production' ? false : true;

console.log(
  `Game server initializing in ${
    DEVELOPMENT ? 'development' : 'production'
  } mode.`
);

// Create the global stores
const gameStore = new GameStore(DEVELOPMENT);
const sessionStore = new SessionStore(DEVELOPMENT);

// Add a mock game to the gameStore which we can use for testing purposes
if (DEVELOPMENT) {
  console.log('Restoring mock game and session');
  gameStore.saveGame(MOCK_GAME);
  sessionStore.saveSession(MOCK_SESSIONS[0]);
  sessionStore.saveSession(MOCK_SESSIONS[1]);
}

// Wire up the express server
const app = express();

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
  new GameSession(io, socket, sessionStore, gameStore);
});

// Start the server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log('Server started on port ' + PORT.toString());
  console.log('Current working directory is ' + process.cwd());
});

// Manage VM operations
process.on('SIGINT', () => {
  console.log('SIGINT received, closing down server.');
  httpServer.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing down server.');
  httpServer.close();
  process.exit(0);
});
