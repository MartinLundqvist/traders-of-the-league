import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title } from '../../elements/Typography';
import { timeToString } from '../../utils/timeToString';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-auto-flow: column;
  top: 0;
  left: 0;
  gap: 1rem;
`;

const Clock = (): JSX.Element => {
  const { startTime } = useGameServer();
  const [timePlayed, setTimePlayed] = useState('00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();

      setTimePlayed(timeToString(startTime, currentTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  if (!startTime) return <></>;

  return (
    <Wrapper>
      <Title>{timePlayed}</Title>
    </Wrapper>
  );
};

export default Clock;
