import { useEffect, useState } from 'react';
import { useGameServer } from '../contexts/GameServerProvider';

export const useReminder = () => {
  const { game } = useGameServer();
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    setShowReminder(false);

    let timeout: NodeJS.Timeout;

    const interval = setInterval(() => {
      setShowReminder(true);
      timeout = setTimeout(() => {
        setShowReminder(false);
      }, 4000);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [game?.state.currentRound.playerUuid]);

  return showReminder;
};
