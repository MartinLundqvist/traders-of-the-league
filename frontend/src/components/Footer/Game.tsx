import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { ButtonSmall, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    font-family: 'Roboto';
    font-size: 0.8rem;

    &:hover {
      cursor: pointer;
    }
  }
}
`;

export const Game = (): JSX.Element => {
  const { game, endGame, gameStatus, isMyGame } = useGameServer();

  const copyToClipBoard = async () => {
    if (!game) return;
    await navigator.clipboard.writeText(game.uuid);
    window.alert('Copied code ' + game.uuid + ' to clipboard.');
  };

  const handleClickEndGame = () => {
    if (!window.confirm('Are you sure you want to end the game?')) return;

    endGame();
  };

  return (
    <Wrapper>
      <TitleSmall>Game Code (click to copy)</TitleSmall>
      <div>
        <span id='code' onClick={() => copyToClipBoard()}>
          {game?.uuid}
        </span>
      </div>
      <ButtonSmall
        disabled={!(isMyGame && !(gameStatus === 'waiting'))}
        onClick={() => handleClickEndGame()}
      >
        End game
      </ButtonSmall>
    </Wrapper>
  );
};
