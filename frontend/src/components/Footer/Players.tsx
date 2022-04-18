import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Player } from './Player';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const Players = (): JSX.Element => {
  const { game } = useGameServer();

  if (!game) return <></>;

  return (
    <Wrapper>
      {game.players.map((player) => (
        <Player player={player} key={player.user.uuid} />
      ))}
    </Wrapper>
  );
};
