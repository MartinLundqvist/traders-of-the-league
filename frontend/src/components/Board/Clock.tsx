import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Title } from '../../elements/Typography';
import { timeToString } from '../../utils/timeToString';
import url_ship from '../../assets/ui/gui_button_your_turn.png';
import url_waiting from '../../assets/ui/gui_button_waiting.png';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-auto-flow: row;
  top: 0;
  left: 0;
  gap: 1rem;

  .me {
    position: relative;
    opacity: 0;
    width: max-content;
    background-color: var(--color-fill-sea-opaque);
    box-shadow: 0 3px 5px var(--color-bg-shadow);
    padding: 0.5rem;
    text-align: center;
    font-size: 1.2rem;
    /* transform: rotateZ(30deg); */
    transition: opacity 200ms ease-in-out;
    pointer-events: none;

    &.show {
      opacity: 1;
    }

    animation: pulsing 500ms ease-in-out alternate infinite;

    @keyframes pulsing {
      to {
        transform: scale(1.2);
      }
    }
  }
  /* .flashing {
    animation: flash 1s alternate infinite;

    @keyframes flash {
      from {
        transform: scale(0.9);
      }
      to {
        transform: scale(1.1);
      }
    }
  } */
`;

const MyTurn = styled.img`
  content: url('${url_ship}');
  width: 6rem;
  filter: drop-shadow(3px 3px 3px var(--color-bg-shadow));

  animation: flash 1s alternate infinite;

  @keyframes flash {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1.1);
    }
  }
`;

const Waiting = styled.img`
  content: url('${url_waiting}');
  width: 6rem;
  filter: drop-shadow(3px 3px 3px var(--color-bg-shadow));

  animation: flash 1s alternate infinite;

  @keyframes flash {
    from {
      transform: rotateZ(-10deg);
    }
    to {
      transform: rotateZ(10deg);
    }
  }
`;

const Clock = (): JSX.Element => {
  const { game, isMyTurn, isInCity } = useGameServer();
  const [timePlayed, setTimePlayed] = useState('00:00');
  const [showReminder, setShowReminder] = useState(false);

  if (!game) return <></>;

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
  }, [game.state.currentRound.playerUuid]);

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
      {/* {isMyTurn && <Title className='flashing'>Your turn!</Title>} */}
      {isMyTurn && (
        <>
          <MyTurn />
          <div className={'me' + (showReminder ? ' show' : '')}>
            <div>Hey captain! Time to make move!</div>
            {isInCity && <div>(Click the city hex to load or trade!)</div>}
          </div>
        </>
      )}
      {!isMyTurn && <Waiting />}
    </Wrapper>
  );
};

export default Clock;
