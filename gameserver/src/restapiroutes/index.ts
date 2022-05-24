import { Router } from 'express';
import { nanoid } from 'nanoid';
import { GameEngine } from '../game-engine';
import { ISession } from '../../../shared/types';
import { GameStore } from '../stores/gameStore';
import { SessionStore } from '../stores/sessionStore';

export const createRestAPIRoutes = (
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
    const { gameName, user } = req.body;

    const newGame = GameEngine.createGame(gameName, nanoid());

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
