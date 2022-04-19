import styled from 'styled-components';
import { IPlayer } from '../../../../shared/types';
import { Stats, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 10rem;

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
      <TitleSmall>
        <div className={player.color}></div>
        {player.user.name}
      </TitleSmall>
      <Stats>VPs: {player.victoryPoints}</Stats>
      <Stats>Achievements: {player.achievements.length}</Stats>
      <Stats>Cities Emptied: {player.citiesEmptied.length}</Stats>
    </Wrapper>
  );
};
