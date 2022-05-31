import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { ButtonSmall, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .row {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }
`;

export const Game = (): JSX.Element => {
  const { endGame, isMyGame } = useGameServer();
  const { setActiveActionRoute } = useLayout();
  const { logout } = useAuth0();

  const handleClickEndGame = () => {
    if (!window.confirm('Are you sure you want to end the game?')) return;

    endGame();
  };

  return (
    <Wrapper>
      <div className='row'>
        <ButtonSmall onClick={() => setActiveActionRoute('about')}>
          Learn to play
        </ButtonSmall>
        <ButtonSmall disabled={!isMyGame} onClick={() => handleClickEndGame()}>
          End game
        </ButtonSmall>
      </div>
      <div className='row'>
        <ButtonSmall
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </ButtonSmall>
        <ButtonSmall onClick={() => setActiveActionRoute('report')}>
          Report a bug
        </ButtonSmall>
      </div>
    </Wrapper>
  );
};
