import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Player } from './Player';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const Players = (): JSX.Element => {
  const { game, me } = useGameServer();

  if (!game) return <></>;

  const isMe = (uuid: string): boolean => {
    return uuid === me.uuid;
  };

  const isPlayerTurn = (uuid: string): boolean => {
    return uuid === game.state.currentRound.playerUuid;
  };

  return (
    <Wrapper>
      {game.players.map((player) => (
        <Player
          player={player}
          key={player.user.uuid}
          me={isMe(player.user.uuid)}
          turn={isPlayerTurn(player.user.uuid)}
        />
      ))}
    </Wrapper>
  );
};
