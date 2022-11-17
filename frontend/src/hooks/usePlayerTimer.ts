import { useEffect, useRef, useState } from 'react';
import { useGameServer } from '../contexts/GameServerProvider';
import { timeToString } from '../utils/timeToString';

export const usePlayerTimer = () => {
  const { myPlayer, isMyTurn, gameStatus } = useGameServer();
  const [localTimeLeft, setLocalTimeLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<NodeJS.Timer>();

  // We initiate a timer that counts down if it is our turn, and we have not already timedOut locally.
  useEffect(() => {
    if (isMyTurn && !timedOut) {
      console.log('Recreating timer ');
      timerRef.current = setInterval(() => {
        setLocalTimeLeft((_prevState) => _prevState - 1000);
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
      console.log('Clearing timer');
    };
  }, [isMyTurn, timedOut]);

  // Whenever the server sends us a new timeLeft we synchronize the local timeLeft.
  // We also synchronize everytime the turn changes, just to be safe...
  useEffect(() => {
    myPlayer && setLocalTimeLeft(myPlayer.timeLeft);
    console.log('Received new timeLeft from server ' + myPlayer?.timeLeft);
  }, [myPlayer?.timeLeft, isMyTurn]);

  // If we run out of time (locally) we set the timedOut boolean to true.
  useEffect(() => {
    localTimeLeft < 0 ? setTimedOut(true) : setTimedOut(false);
  }, [localTimeLeft]);

  // If the game stops for whatever reason, we clear the timer
  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'terminated') {
      console.log('Game state is won or termianted, so timer is cleared');
      clearInterval(timerRef.current);
    }
  }, [gameStatus]);

  return { timeLeft: timeToString(localTimeLeft), timedOut };
};
