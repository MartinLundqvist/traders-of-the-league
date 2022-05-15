import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { ButtonSmall, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div#code {
    font-family: 'Roboto';
    font-size: 0.8rem;

    &:hover {
      cursor: pointer;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }

}
`;

export const Game = (): JSX.Element => {
  const { activeGameUuid, endGame, isMyGame } = useGameServer();
  const { setActiveActionRoute } = useLayout();
  const { logout } = useAuth0();

  const copyToClipBoard = async () => {
    if (!activeGameUuid) return;
    await navigator.clipboard.writeText(activeGameUuid);
    window.alert('Copied code ' + activeGameUuid + ' to clipboard.');
  };

  const handleClickEndGame = () => {
    if (!window.confirm('Are you sure you want to end the game?')) return;

    endGame();
  };

  return (
    <Wrapper>
      <TitleSmall>Game Code (click to copy)</TitleSmall>
      <div id='code' onClick={() => copyToClipBoard()}>
        {activeGameUuid}
      </div>
      <div className='buttons'>
        <ButtonSmall onClick={() => setActiveActionRoute('about')}>
          Learn to play
        </ButtonSmall>
        <ButtonSmall disabled={!isMyGame} onClick={() => handleClickEndGame()}>
          End game
        </ButtonSmall>
        <ButtonSmall onClick={() => logout()}>Logout</ButtonSmall>
      </div>
    </Wrapper>
  );
};
