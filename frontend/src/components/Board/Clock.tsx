import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title } from '../../elements/Typography';
import { timeToString } from '../../utils/timeToString';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-auto-flow: row;
  top: 0;
  left: 0;
  gap: 1rem;

  .flashing {
    animation: flash 1s alternate infinite;

    @keyframes flash {
      from {
        transform: scale(0.9);
      }
      to {
        transform: scale(1.1);
      }
    }
  }
`;

const Clock = (): JSX.Element => {
  const { game, isMyTurn } = useGameServer();
  const [timePlayed, setTimePlayed] = useState('00:00');

  if (!game) return <></>;

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();

      setTimePlayed(timeToString(game.startTime, currentTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [game.startTime]);

  return (
    <Wrapper>
      <Title>{timePlayed}</Title>
      {isMyTurn && <Title className='flashing'>Your turn!</Title>}
    </Wrapper>
  );
};

export default Clock;
