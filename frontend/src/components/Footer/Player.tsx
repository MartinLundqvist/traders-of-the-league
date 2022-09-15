import styled from 'styled-components';
import { IPlayer } from '../../../../shared/types';
import { IMAGES } from '../../elements/Images';
import Good from '../Board/Good';

const AchImg = styled.img`
  content: url('${IMAGES.UI.PLAYER_STATUS.achievement}');
  max-width: 100%;
  max-height: 100%;
`;

const CityImg = styled.img`
  content: url('${IMAGES.UI.PLAYER_STATUS.city}');
  max-width: 100%;
  max-height: 100%;
`;

const Wrapper = styled.div`
  background-image: url('${IMAGES.UI.SCROLLS.player_scroll}');
  background-size: 100% 100%;
  background-position: center;
  background-origin: border-box;
  background-repeat: no-repeat;
  max-width: 10rem;
  height: 130%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* gap: 0.3rem; */
  padding: 0.5rem 2rem 0.25rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 0.25rem;
  transform: translateY(-25%);

  &.me {
    height: 140%;
    transform: translateY(-30%);
  }

  .points {
    font-size: 0.8rem;
  }

  &.turn {
    filter: contrast(120%);
    &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: -5%;
      left: 0;
      background-image: url('${IMAGES.UI.PLAYER_STATUS.status}');
      background-size: 40%;
      background-position: top center;
      background-repeat: no-repeat;
    }
  }

  .cargo {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  .achievements {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }

  .cities-emptied {
    display: grid;
    grid-template-columns: repeat(6, 1fr);

    img {
      grid-row: 1;
    }

    img:nth-child(1) {
      grid-column: 1;
    }
    img:nth-child(2) {
      grid-column: 2;
    }
    img:nth-child(3) {
      grid-column: 3;
    }
    img:nth-child(4) {
      grid-column: 4;
    }
    img:nth-child(5) {
      grid-column: 5;
    }
    img:nth-child(6) {
      grid-column: 6;
    }

    img:nth-child(7) {
      grid-column: 1;
      transform: translate(2px, 2px);
      z-index: -1;
    }
    img:nth-child(8) {
      grid-column: 2;
      transform: translate(2px, 2px);
      z-index: -1;
    }
    img:nth-child(9) {
      grid-column: 3;
      transform: translate(2px, 2px);
      z-index: -1;
    }
    img:nth-child(10) {
      grid-column: 4;
      transform: translate(2px, 2px);
      z-index: -1;
    }
    img:nth-child(11) {
      grid-column: 5;
      transform: translate(2px, 2px);
      z-index: -1;
    }
    img:nth-child(11) {
      grid-column: 6;
      transform: translate(2px, 2px);
      z-index: -1;
    }
  }

  .player-color {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.7rem;
    aspect-ratio: 1 / 1;
    opacity: 0.9;

    &.black {
      background-color: black;
    }
    &.red {
      background-color: red;
    }
    &.blue {
      background-color: blue;
    }
    &.green {
      background-color: green;
    }
    &.yellow {
      background-color: yellow;
    }
  }
`;

interface IPlayerProps {
  player: IPlayer;
  me?: boolean;
  turn?: boolean;
}
export const Player = ({
  player,
  me = false,
  turn = false,
}: IPlayerProps): JSX.Element => {
  const getAchievements = (): JSX.Element[] | JSX.Element => {
    let result: JSX.Element[] = [];

    if (player.achievements.length === 0)
      return <span style={{ fontSize: '1rem' }}>-</span>;

    for (let i = 0; i < player.achievements.length; i++) {
      result.push(<AchImg key={'ach' + i} />);
    }

    return result;
  };

  const getCitiesEmptied = (): JSX.Element[] | JSX.Element => {
    let result: JSX.Element[] = [];

    if (player.citiesEmptied.length === 0)
      return <span style={{ fontSize: '1rem' }}>-</span>;

    for (let i = 0; i < player.citiesEmptied.length; i++) {
      result.push(<CityImg key={'city' + i} />);
    }

    return result;
  };

  return (
    <Wrapper className={(turn ? 'turn ' : '') + (me ? 'me ' : '')}>
      <div className='player'>
        <div className={'player-color ' + player.color}></div>
        {player.user.name}
      </div>
      <div className='points'>VPs: {player.victoryPoints}</div>
      <div className='achievements'>{getAchievements()}</div>
      <div className='cities-emptied'>{getCitiesEmptied()}</div>
      <div className='cargo'>
        {player.cargo.map((good, index) => (
          <Good good={good} key={good + index} />
        ))}
      </div>
    </Wrapper>
  );
};
