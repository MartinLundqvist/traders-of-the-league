import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import { ButtonSmall, TitleSmall } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Controls = (): JSX.Element => {
  const {
    game,
    startGame,
    endRound,
    isMyTurn,
    isMyGameToStart,
    canTrade,
    canLoad,
  } = useGameServer();

  const { setActiveActionRoute } = useLayout();

  return (
    <Wrapper>
      <TitleSmall>{isMyTurn ? 'Make a move' : 'Wait for your turn'}</TitleSmall>
      {isMyGameToStart && (
        <ButtonSmall onClick={() => startGame()}>Start game</ButtonSmall>
      )}

      {game?.state.started && (
        <>
          <div>
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
          </div>
          <div>
            <ButtonSmall disabled={!isMyTurn} onClick={() => endRound()}>
              End round
            </ButtonSmall>
          </div>
        </>
      )}
    </Wrapper>
  );
};
