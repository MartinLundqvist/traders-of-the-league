import { useGameServer } from '../../contexts/GameServerProvider';
import { IMAGES } from '../../elements/Images';
import styled from 'styled-components';
import { useTimePlayed } from '../../hooks/useTimePlayed';
import { useReminder } from '../../hooks/useReminder';
import { usePlayerTimer } from '../../contexts/TimerProvider';
import { timeToString } from '../../utils/timeToString';
// import { usePlayerTimer } from '../../hooks/usePlayerTimer';

const IMG = styled.img`
  min-height: 0;
  max-height: 100%;
  max-width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background: linear-gradient(
    var(--color-background-dark),
    var(--color-background-medium)
  );
  border-bottom: 2px solid black;

  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 5px;
    width: 100%;
    border-bottom: 2px solid black;
    z-index: -1;
  }

  .game-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
    margin-left: auto;

    .cities-emptied {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      gap: 0.25rem;
      height: 80%;
      width: 100%;
      height: 100%;
      font-size: 1.2rem;

      .cities-emptied--grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);

        img {
          grid-row: 1;
        }

        img:nth-child(1) {
          grid-column: 8;
        }
        img:nth-child(2) {
          grid-column: 7;
        }
        img:nth-child(3) {
          grid-column: 6;
        }
        img:nth-child(4) {
          grid-column: 5;
        }
        img:nth-child(5) {
          grid-column: 4;
        }
        img:nth-child(6) {
          grid-column: 3;
        }
        img:nth-child(7) {
          grid-column: 2;
        }
        img:nth-child(8) {
          grid-column: 1;
        }
        img:nth-child(9) {
          grid-column: 8;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(10) {
          grid-column: 7;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(11) {
          grid-column: 6;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(12) {
          grid-column: 5;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(13) {
          grid-column: 4;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(14) {
          grid-column: 3;
          transform: translate(5px, 5px);
          z-index: -1;
        }
        img:nth-child(15) {
          grid-column: 2;
          transform: translate(5px, 5px);
          z-index: -1;
        }
      }
    }
    .game-name {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      /* font-size: 3ch; */
      text-align: center;
      width: 100%;
      height: 100%;

      &::after {
        content: '';
        background-image: url('${IMAGES.UI.MAIN.game_name_banner}');
        background-size: 30% 100%;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        display: inline-block;
        bottom: -20%;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .moves-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 0.25rem;
      width: 100%;
      height: 100%;
      font-size: 1.2rem;

      .moves-left--grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);

        img {
          grid-row: 1;
        }
      }
    }
  }

  .game-state {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 0.5rem;
    height: 100%;
    min-width: max-content;

    .game-state--text {
      font-size: 1rem;
      width: 9rem;

      .remind {
        animation: zoom-in 500ms linear alternate infinite;
      }

      @keyframes zoom-in {
        to {
          transform: scale(2);
        }
      }
    }
  }
`;

interface IHeaderProps {
  className: string;
}

const Header = ({ className }: IHeaderProps) => {
  const { isMyTurn, game, myPlayer } = useGameServer();
  const timePlayed = useTimePlayed();
  const { timeLeft, timedOut } = usePlayerTimer();
  const showReminder = useReminder();

  const getNameFontSize = (length: number): string => {
    if (!game) return '4ch';
    if (length < 15) return '4ch';
    const fraction = 4 * (15 / length);
    return fraction.toString() + 'ch';
  };

  const getMovesLeft = (): JSX.Element[] => {
    let result: JSX.Element[] = [];

    if (!game) return result;

    for (let i = 0; i < game.state.currentRound.movesLeft; i++) {
      result.push(<IMG src={IMAGES.UI.BUTTONS.moveLeft} key={i} />);
    }

    return result;
  };

  const getCitiesEmptied = (): JSX.Element[] => {
    let result: JSX.Element[] = [];

    if (!game) return result;

    for (let i = 0; i < game.state.numberOfCitiesEmptied; i++) {
      result.push(<IMG src={IMAGES.UI.BUTTONS.city_emptied} key={'ec' + i} />);
    }

    for (
      let i = 0;
      i < game.numberOfCitiesToEmpty - game.state.numberOfCitiesEmptied;
      i++
    ) {
      result.push(
        <IMG src={IMAGES.UI.BUTTONS.city_not_emptied} key={'nec' + i} />
      );
    }

    return result;
  };

  return (
    <Wrapper className={className}>
      <IMG src={IMAGES.UI.MAIN.logo} />

      {game && (
        <>
          <div className='game-container'>
            <div className='cities-emptied'>
              <div>Cities emptied</div>
              <div className='cities-emptied--grid'>{getCitiesEmptied()}</div>
            </div>
            <div className='game-name'>
              <div
                className='game-name--title'
                style={{ fontSize: getNameFontSize(game.name.length) }}
              >
                {game.name}
              </div>
            </div>
            <div className='moves-left'>
              <div>Moves left</div>
              <div className='moves-left--grid'>{getMovesLeft()}</div>
            </div>
          </div>
          <div className='game-state'>
            <div className='game-state--text'>
              {timedOut ? (
                <div>You timed out!</div>
              ) : (
                <div>Your timer: {timeToString(timeLeft)}</div>
              )}
              <div>Game time: {timePlayed}</div>
              <div className={isMyTurn && showReminder ? 'remind' : ''}>
                {isMyTurn ? 'Your turn!' : 'Waiting'}
              </div>
            </div>
            {isMyTurn ? (
              <IMG src={IMAGES.UI.MAIN.ship} />
            ) : (
              <IMG src={IMAGES.UI.MAIN.waiting} />
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Header;
