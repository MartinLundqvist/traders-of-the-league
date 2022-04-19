import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { Stats, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`

  span {
    font-family: 'Roboto';

    &:hover {
      cursor: pointer;
    }
  }
}
`;

export const GameState = (): JSX.Element => {
  const { game } = useGameServer();

  const getCurrentPlayerName = (): string => {
    let player = game?.players.find(
      (player) => player.user.uuid === game?.state.currentRound.playerUuid
    );
    if (!player) return '';
    return player.user.name;
  };

  const copyToClipBoard = async () => {
    if (!game) return;
    await navigator.clipboard.writeText(game.uuid);
    window.alert('Copied code ' + game.uuid + ' to clipboard.');
  };

  return (
    <Wrapper>
      <TitleSmall>GameState</TitleSmall>
      <Stats>
        Game {game?.state.started ? 'is ongoing' : 'has not started'}
      </Stats>
      <Stats>Round: {game?.state.round}</Stats>
      <Stats>Playing: {getCurrentPlayerName()}</Stats>
      <Stats>Moves left: {game?.state.currentRound.movesLeft}</Stats>
      <Stats>
        Game code:{' '}
        <span id='code' onClick={() => copyToClipBoard()}>
          {game?.uuid}
        </span>
      </Stats>
    </Wrapper>
  );
};
