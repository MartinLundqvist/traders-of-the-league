import { Router } from 'express';
import { nanoid } from 'nanoid';
import { GameEngine } from '../game-engine';
import { ISession } from '../../../shared/types';
import { GameStore } from '../stores/gameStore';
import { SessionStore } from '../stores/sessionStore';
import { ChatStore } from '../stores/chatStore';
import { BugReportStore } from '../stores/bugReportStore';
import { getAllUsers, resendVerificationEmail } from '../auth-controllers';
import { RankingStore } from '../stores/rankingStore';

export const createGameAPIRoutes = (
  sessionStore: SessionStore,
  gameStore: GameStore
): Router => {
  const router = Router();

  // Session and game management routes
  router.post('/createSession', async (req, res, next) => {
    const { name, email } = req.body;

    // Create the session
    let newSession: ISession = {
      user: { name, uuid: nanoid(), connected: true },
      uuid: nanoid(),
      email: email,
      activeGameUuid: '',
    };

    // Persist it
    await sessionStore.saveSession(newSession);

    res.status(200).send(newSession);
  });

  router.post('/createAndJoinNewGame', async (req, res, next) => {
    const { gameName, gameTempo, ranked, user } = req.body;

    const newGame = GameEngine.createGame(
      gameName,
      gameTempo,
      ranked,
      nanoid()
    );

    const newPlayer = GameEngine.addPlayerToGame(user, newGame);
    newGame.players.push(newPlayer);

    await gameStore.saveGame(newGame);

    res.status(200).send(newGame);
  });

  router.post('/joinGame', async (req, res, next) => {
    const { user, gameUuid } = req.body;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      const newPlayer = GameEngine.addPlayerToGame(user, game);
      game.players.push(newPlayer);

      await gameStore.saveGame(game);

      res.status(200).send(game);
    }
  });

  router.post('/startGame', async (req, res, next) => {
    const { gameUuid, user } = req.body;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      GameEngine.start(game, user.uuid);

      await gameStore.saveGame(game);

      res.status(200).send(game);
    }
  });

  router.get('/getGame/:gameUuid', async (req, res, next) => {
    const { gameUuid } = req.params;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      res.status(200).send(game);
    }
  });

  // In-game controls
  router.post('/playing/ditchCargo', async (req, res, next) => {
    const { gameUuid, cargo } = req.body;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      // Have the engine figure out wether it is a valid move, and if so, execute it.
      let validMove = GameEngine.ditchCargoForCurrentPlayer(game, cargo);

      if (validMove) {
        // If the move is valid, we persist and push the new game state
        await gameStore.saveGame(game);
        res.status(200).send(game);
      } else {
        res.status(500).send({ message: 'Error ditching!' });
      }
    }
  });

  router.post('/playing/pickAchievement', async (req, res, next) => {
    const { gameUuid, achievement } = req.body;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      // Have the engine figure out wether it is a valid move, and if so, execute it.
      let validPick = GameEngine.pickAchievementForCurrentPlayer(
        game,
        achievement
      );

      if (validPick) {
        // If the move is valid, we persist and push the new game state
        await gameStore.saveGame(game);
        res.status(200).send(game);
      } else {
        res.status(500).send({ message: 'Error picking achievement!' });
      }
    }
  });

  router.post('/playing/makeTrades', async (req, res, next) => {
    const { gameUuid, contracts } = req.body;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      // Have the engine figure out wether it is a valid move, and if so, execute it.
      let validTrade = GameEngine.makeTradesForCurrentPlayer(game, contracts);

      if (validTrade) {
        // If the move is valid, we persist and push the new game state
        await gameStore.saveGame(game);
        res.status(200).send(game);
      } else {
        res.status(500).send({ message: 'Error trading!' });
      }
    }
  });

  router.post('/playing/loadCargo', async (req, res, next) => {
    const { gameUuid, cargo } = req.body;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      // Have the engine figure out wether it is a valid move, and if so, execute it.
      let validMove = GameEngine.loadCargoForCurrentPlayer(game, cargo);

      if (validMove) {
        // If the move is valid, we persist and push the new game state
        await gameStore.saveGame(game);
        res.status(200).send(game);
      } else {
        res.status(500).send({ message: 'Error loading!' });
      }
    }
  });

  router.post('/playing/sailTo', async (req, res, next) => {
    const { gameUuid, position } = req.body;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      // Have the engine figure out wether it is a valid move, and if so, execute it.
      let validMove = GameEngine.sailCurrentPlayerTo(game, position);

      if (validMove) {
        // If the move is valid, we persist and push the new game state
        await gameStore.saveGame(game);
        res.status(200).send(game);
      } else {
        res.status(500).send({ message: 'Error sailing!' });
      }
    }
  });

  router.post('/playing/endRound', async (req, res, next) => {
    const { gameUuid } = req.body;

    const game = await gameStore.getGame(gameUuid);

    if (!game) {
      res.status(500).send({ message: 'Error fetching game.' });
    } else {
      // Have the engine figure out wether it is a valid move, and if so, execute it.
      GameEngine.processEndOfRoundAchievements(game);

      await gameStore.saveGame(game);
      res.status(200).send(game);
    }
  });

  return router;
};

export const createRoutes = (
  gameStore: GameStore,
  sessionStore: SessionStore,
  chatStore: ChatStore,
  bugReportStore: BugReportStore,
  rankingStore: RankingStore
): Router => {
  const router = Router();

  // This route gets information about all games
  router.get('/games', async (req, res) => {
    const games = await gameStore.getGames();

    // const results = games.map((game) => {
    //   return {
    //     name: game.name,
    //     uuid: game.uuid,
    //     status: game.state.status,
    //   };
    // });

    res.status(200).send(games);
  });

  // This route gets information about all sessions
  router.get('/sessions', async (req, res) => {
    const sessions = await sessionStore.getSessions();

    // const results = sessions.map((session) => {
    //   return {
    //     user: session.user,
    //     uuid: session.user.uuid,
    //   };
    // });

    res.status(200).send(sessions);
  });

  // This route gets information about all chats
  router.get('/chats', async (req, res) => {
    const chats = await chatStore.getChats();

    // const results = chats.map((chat) => {
    //   return {
    //     uuid: chat.gameUuid,
    //     nrMessages: chat.messages.length,
    //   };
    // });

    res.status(200).send(chats);
  });

  // This route gets the complete list of won games
  router.get('/wongames', async (req, res) => {
    const games = await gameStore.getGames();

    const results = games.filter((game) => game.state.status === 'won');

    res.status(200).send(results);
  });

  // This route gets game results for a gameUuid
  router.get('/gameresults/:gameUuid', async (req, res) => {
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
  router.post('/postbugreport', async (req, res) => {
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
  router.get('/bugreports', async (req, res) => {
    const reports = await bugReportStore.getBugReports();

    res.status(200).send(reports);
  });

  // This route gets all active games
  router.get('/activegames', async (req, res) => {
    const games = await gameStore.getActiveGames();

    res.status(200).send(games);
  });

  // This route gets all player rankings
  router.get('/playerrankings', async (req, res) => {
    const rankings = await rankingStore.getAllRankings();

    res.status(200).send(rankings);
  });

  // This route asks Auth0 to resend a verification email
  router.get('/resendemail/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const result = await resendVerificationEmail(user_id);

    res
      .status(200)
      .send({ message: 'Verification email sent: ', success: result });
  });

  router.get('/allusers', async (req, res) => {
    const result = await getAllUsers();

    res.status(200).send(result);
  });

  // This is merely for health checks. Probably don't even need the express package for this app hmm....
  router.get('/', (req, res) => {
    res.status(200).send({ message: 'Ok' });
  });

  return router;
};
