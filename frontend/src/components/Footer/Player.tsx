import styled from 'styled-components';
import { IPlayer } from '../../../../shared/types';
import url_scroll from '../../assets/ui/gui_player_status.png';
import Good from '../Board/Good';

interface IWrapperProps {
  zoom: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  background-image: url('${url_scroll}');
  background-size: 100% 100%;
  background-position: center;
  background-origin: border-box;
  background-repeat: no-repeat;
  max-width: 10rem;
  height: 125%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 2rem 0.25rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 0.25rem;
  transform: translateY(-25%);

  ${(props) =>
    props.zoom &&
    `
    transform: translateY(-25%) scale(1.1);
    filter: contrast(110%);
    `}

  /* 
  background-color: var(--color-bg);
  box-shadow: 3px 3px 3px var(--color-bg-shadow); */

  .content {
    font-size: 0.8rem;
  }

  .cargo {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  .black {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.7rem;
    aspect-ratio: 1 / 1;
    background-color: black;
    opacity: 0.9;
  }
  .red {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.7rem;
    aspect-ratio: 1 / 1;
    background-color: red;
    opacity: 0.9;
  }
  .blue {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.7rem;
    aspect-ratio: 1 / 1;
    background-color: blue;
    opacity: 0.9;
  }
  .green {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.7rem;
    aspect-ratio: 1 / 1;
    background-color: green;
    opacity: 0.9;
  }
  .yellow {
    display: inline-block;
    margin-right: 0.7rem;
    height: 0.8rem;
    aspect-ratio: 1 / 1;
    background-color: yellow;
    opacity: 0.9;
  }
`;

interface IPlayerProps {
  player: IPlayer;
  zoom?: boolean;
}
export const Player = ({ player, zoom = false }: IPlayerProps): JSX.Element => {
  return (
    <Wrapper zoom={zoom}>
      <div className='player'>
        <div className={player.color}></div>
        {player.user.name}
      </div>
      <div className='content'>VPs: {player.victoryPoints}</div>
      <div className='content'>Achievements: {player.achievements.length}</div>
      <div className='content'>
        Cities emptied: {player.citiesEmptied.length}
      </div>
      <div className='cargo'>
        {player.cargo.map((good, index) => (
          <Good good={good} key={good + index} />
        ))}
      </div>
    </Wrapper>
  );
};
