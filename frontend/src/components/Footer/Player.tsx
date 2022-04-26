import styled from 'styled-components';
import { IPlayer } from '../../../../shared/types';
import { Stats, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.25rem 1rem 0.25rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.25rem;

  background-color: var(--color-bg);
  box-shadow: 3px 3px 3px var(--color-bg-shadow);

  .content {
    font-size: 1rem;
  }

  .black {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.8rem;
    aspect-ratio: 1 / 1;
    background-color: black;
    opacity: 0.9;
  }
  .red {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.8rem;
    aspect-ratio: 1 / 1;
    background-color: red;
    opacity: 0.9;
  }
  .blue {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.8rem;
    aspect-ratio: 1 / 1;
    background-color: blue;
    opacity: 0.9;
  }
  .green {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.8rem;
    aspect-ratio: 1 / 1;
    background-color: green;
    opacity: 0.9;
  }
  .yellow {
    display: inline-block;
    margin-right: 0.5rem;
    height: 0.8rem;
    aspect-ratio: 1 / 1;
    background-color: yellow;
    opacity: 0.9;
  }
`;

interface IPlayerProps {
  player: IPlayer;
}
export const Player = ({ player }: IPlayerProps): JSX.Element => {
  return (
    <Wrapper>
      <div className='player'>
        <div className={player.color}></div>
        {player.user.name}
      </div>
      <div className='content'>VPs: {player.victoryPoints}</div>
      <div className='content'>Achievements: {player.achievements.length}</div>
      <div className='content'>
        Cities Emptied: {player.citiesEmptied.length}
      </div>
    </Wrapper>
  );
};
