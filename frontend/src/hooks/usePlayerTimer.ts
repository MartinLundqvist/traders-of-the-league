import { useEffect, useState } from 'react';
import { useGameServer } from '../contexts/GameServerProvider';
import { timeToString } from '../utils/timeToString';

export const usePlayerTimer = () => {
  const { myPlayer, isMyTurn, gameStatus } = useGameServer();
  const [localTimeLeft, setLocalTimeLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  // useEffect(() => {
  //   console.log('Creating a usePlayTimer');
  // }, []);

  // We initiate a timer that counts down if it is our turn, and we have not already timedOut locally.
  useEffect(() => {
    let timer: NodeJS.Timer;
    if (isMyTurn && !timedOut) {
      timer = setInterval(() => {
        setLocalTimeLeft((_prevState) => _prevState - 1000);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isMyTurn, timedOut]);

  // Whenever the server sends us a new timeLeft we synchronize the local timeLeft.
  // We also synchronize everytime the turn changes, just to be safe...
  useEffect(() => {
    myPlayer && setLocalTimeLeft(myPlayer.timeLeft);
    // console.log('Received new timeLeft from server ' + myPlayer?.timeLeft);
  }, [myPlayer?.timeLeft, isMyTurn]);

  // If we run out of time (locally) we set the timedOut boolean to true.
  useEffect(() => {
    localTimeLeft < 0 ? setTimedOut(true) : setTimedOut(false);
  }, [localTimeLeft]);

  return { timeLeft: timeToString(localTimeLeft), timedOut };
};
