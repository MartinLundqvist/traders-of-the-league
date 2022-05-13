import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;

  &.ismyturn {
    animation: come-and-go 3000ms ease-in-out;
  }

  @keyframes come-and-go {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    30% {
      opacity: 1;
      transform: scale(3);
    }
    70% {
      opacity: 1;
      transform: scale(3);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`;

interface INotificationsProps {
  className: string;
}

const Notifications = ({ className }: INotificationsProps): JSX.Element => {
  const { isMyTurn } = useGameServer();
  const [classes, setClasses] = useState('');

  useEffect(() => {
    let tempClasses = className;
    isMyTurn && (tempClasses += ' ismyturn');
    setClasses(tempClasses);
  }, [isMyTurn]);

  return (
    <Wrapper className={classes}>
      <Title>Your turn</Title>
    </Wrapper>
  );
};

export default Notifications;
