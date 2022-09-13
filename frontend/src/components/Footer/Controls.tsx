import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { ButtonImage, ButtonSmall } from '../../elements/Typography';
import url_endRound from '../../assets/ui/gui_button_end_turn.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

export const Controls = (): JSX.Element => {
  const { startGame, endRound, isMyTurn, isMyGame, gameStatus, canAchieve } =
    useGameServer();

  if (gameStatus === 'won' || gameStatus === 'terminated') return <div></div>;

  return (
    <Wrapper>
      {isMyGame && gameStatus === 'waiting' && (
        <ButtonSmall onClick={() => startGame()}>Start game</ButtonSmall>
      )}

      {(gameStatus === 'playing' || gameStatus === 'endgame') && (
        <ButtonImage
          image_url={url_endRound}
          disabled={!isMyTurn || canAchieve}
          onClick={() => endRound({ confirm: true })}
          tooltip='End round'
        />
      )}
    </Wrapper>
  );
};
