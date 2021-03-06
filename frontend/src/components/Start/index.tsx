import styled from 'styled-components';
import { useLayout } from '../../contexts/LayoutProvider';
import { Title } from '../../elements/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  .button {
    transition: all 200ms ease-in-out;
    &:hover {
      cursor: pointer;
      transform: translate(-5px, -5px);
      text-shadow: 8px 8px 3px hsla(57, 145%, 30%, 0.6);
    }
  }
`;

interface IStartProps {
  className: string;
}

const Start = ({ className }: IStartProps): JSX.Element => {
  const { setActiveRoute } = useLayout();
  return (
    <Wrapper className={className}>
      <Title className='button' onClick={() => setActiveRoute('newgame')}>
        Start New Game
      </Title>
      <Title className='button' onClick={() => setActiveRoute('joingame')}>
        Join Existing Game
      </Title>
    </Wrapper>
  );
};

export default Start;
