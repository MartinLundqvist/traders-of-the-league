import styled from 'styled-components';
import { IPlayer } from '../../../../shared/types';
import { Stats, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 10rem;
`;

interface IPlayerProps {
  player: IPlayer;
}
export const Player = ({ player }: IPlayerProps): JSX.Element => {
  return (
    <Wrapper>
      <TitleSmall>{player.name}</TitleSmall>
      <Stats>VPs: {player.victoryPoints}</Stats>
      <Stats>Achievements: {player.achievements.length}</Stats>
      <Stats>Cities Emptied: {player.citiesEmptied.length}</Stats>
    </Wrapper>
  );
};
