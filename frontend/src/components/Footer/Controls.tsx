import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import {
  ButtonImage,
  ButtonSmall,
  TitleSmall,
} from '../../elements/Typography';
import url_endRound from '../../assets/ui/gui_button_end_turn.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

export const Controls = (): JSX.Element => {
  const {
    startGame,
    endRound,
    isMyTurn,
    isMyGame,
    gameStatus,
    canTrade,
    canLoad,
    canAchieve,
  } = useGameServer();

  // const { setActiveActionRoute } = useLayout();

  if (gameStatus === 'won' || gameStatus === 'terminated') return <div></div>;

  return (
    <Wrapper>
      {/* <TitleSmall>
        {gameStatus === 'playing' || gameStatus === 'endgame'
          ? isMyTurn
            ? 'Make a move'
            : 'Wait for your turn'
          : 'Not started'}
      </TitleSmall> */}
      {isMyGame && gameStatus === 'waiting' && (
        <ButtonSmall onClick={() => startGame()}>Start game</ButtonSmall>
      )}

      {(gameStatus === 'playing' || gameStatus === 'endgame') && (
        <>
          {/* <div>
            <ButtonSmall
              disabled={!canLoad}
              onClick={() => setActiveActionRoute('load')}
            >
              Load
            </ButtonSmall>
            <ButtonSmall
              disabled={!canTrade}
              onClick={() => setActiveActionRoute('trade')}
            >
              Trade
            </ButtonSmall>
            <ButtonSmall
              disabled={!isMyTurn}
              onClick={() => setActiveActionRoute('ditch')}
            >
              Ditch
            </ButtonSmall>
          </div> */}
          <ButtonImage
            image_url={url_endRound}
            disabled={!isMyTurn || canAchieve}
            onClick={() => endRound({ confirm: true })}
            tooltip='End round'
          />
        </>
      )}
    </Wrapper>
  );
};
