import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { IMAGES } from '../../elements/Images';
import { ButtonImage } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  .row {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }
`;

export const Game = (): JSX.Element => {
  const { endGame, isMyGame, yieldGame } = useGameServer();
  const { setActiveActionRoute } = useLayout();
  const { logout } = useAuth0();

  const handleClickEndGame = () => {
    if (!window.confirm('Are you sure you want to end the game?')) return;

    endGame();
  };

  return (
    <Wrapper>
      <ButtonImage
        image_url={IMAGES.UI.BUTTONS.help}
        onClick={() => setActiveActionRoute('about')}
        tooltip='Learn the game'
      />
      <ButtonImage
        image_url={IMAGES.UI.BUTTONS.logout}
        onClick={() => logout({ returnTo: window.location.origin })}
        tooltip='Logout'
      />
      <ButtonImage
        image_url={IMAGES.UI.BUTTONS.bugReport}
        onClick={() => setActiveActionRoute('report')}
        tooltip='Report a bug'
      />
      <ButtonImage
        image_url={IMAGES.UI.BUTTONS.forfeit}
        onClick={() => yieldGame()}
        tooltip='Leave this game'
      />
      <ButtonImage
        image_url={IMAGES.UI.BUTTONS.endGame}
        disabled={!isMyGame}
        onClick={() => handleClickEndGame()}
        tooltip='End this game'
      />
    </Wrapper>
  );
};
