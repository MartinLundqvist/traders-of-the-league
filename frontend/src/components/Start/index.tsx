import styled from 'styled-components';
import { useLayout } from '../../contexts/LayoutProvider';
import ScrollFull from '../../elements/ScrollFull';
import { TitleButton } from '../../elements/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

interface IStartProps {
  className: string;
}

const Start = ({ className }: IStartProps): JSX.Element => {
  const { setActiveRoute } = useLayout();
  return (
    <ScrollFull className={className}>
      <Container>
        <TitleButton onClick={() => setActiveRoute('newgame')}>
          Start New Game
        </TitleButton>
        <TitleButton onClick={() => setActiveRoute('joingame')}>
          Join Existing Game
        </TitleButton>
      </Container>
    </ScrollFull>
  );
};

export default Start;
