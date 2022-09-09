import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { ButtonImage } from '../../elements/Typography';
import url_help from '../../assets/ui/gui_button_howtoplay.png';
import url_bugReport from '../../assets/ui/gui_button_bugreport.png';
import url_endGame from '../../assets/ui/gui_button_end_game.png';
import url_logout from '../../assets/ui/gui_button_log_out.png';
import url_yield from '../../assets/ui/gui_button_forfeit_game.png';

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
        image_url={url_help}
        onClick={() => setActiveActionRoute('about')}
        tooltip='Learn the game'
      />
      <ButtonImage
        image_url={url_logout}
        onClick={() => logout({ returnTo: window.location.origin })}
        tooltip='Logout'
      />
      <ButtonImage
        image_url={url_bugReport}
        onClick={() => setActiveActionRoute('report')}
        tooltip='Report a bug'
      />
      <ButtonImage
        image_url={url_yield}
        onClick={() => yieldGame()}
        tooltip='Leave this game'
      />
      <ButtonImage
        image_url={url_endGame}
        disabled={!isMyGame}
        onClick={() => handleClickEndGame()}
        tooltip='End this game'
      />
    </Wrapper>
  );
};
