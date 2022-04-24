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
  const { game, startGame, endRound, isMyTurn, isMyGameToStart, isInCity } =
    useGameServer();

  const { setActiveActionRoute } = useLayout();

  return (
    <Wrapper>
      <TitleSmall>Controls</TitleSmall>
      {isMyGameToStart && (
        <ButtonSmall onClick={() => startGame()}>Start game</ButtonSmall>
      )}

      {game?.state.started && (
        <>
          <div>
            {/* <ButtonSmall disabled={!isMyTurn()}>Sail</ButtonSmall> */}
            <ButtonSmall
              disabled={!isMyTurn || !isInCity}
              onClick={() => setActiveActionRoute('load')}
            >
              Load
            </ButtonSmall>
            <ButtonSmall
              disabled={!isMyTurn || !isInCity}
              onClick={() => setActiveActionRoute('trade')}
            >
              Trade
            </ButtonSmall>
            <ButtonSmall disabled={!isMyTurn}>Ditch</ButtonSmall>
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
