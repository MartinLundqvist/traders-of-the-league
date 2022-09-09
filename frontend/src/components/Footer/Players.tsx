import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Player } from './Player';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Players = (): JSX.Element => {
  const { game, me } = useGameServer();

  if (!game) return <></>;

  const isMe = (uuid: string): boolean => {
    return uuid === me.uuid;
  };

  return (
    <Wrapper>
      {game.players.map((player) => (
        <Player
          player={player}
          key={player.user.uuid}
          zoom={isMe(player.user.uuid)}
        />
      ))}
    </Wrapper>
  );
};
