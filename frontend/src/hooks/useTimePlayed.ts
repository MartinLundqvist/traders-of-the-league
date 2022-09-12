import { useEffect, useState } from 'react';
import { useGameServer } from '../contexts/GameServerProvider';
import { timeToString } from '../utils/timeToString';

export const useTimePlayed = () => {
  const { game } = useGameServer();
  const [timePlayed, setTimePlayed] = useState('Not started');

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (game) {
      timer = setInterval(() => {
        const currentTime = new Date().getTime();

        setTimePlayed(timeToString(game.startTime, currentTime));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [game?.startTime]);

  return timePlayed;
};
