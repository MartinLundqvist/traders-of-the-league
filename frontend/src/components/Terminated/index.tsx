import styled from 'styled-components';
import { useGameServer } from '../../contexts/GameServerProvider';
import { useLayout } from '../../contexts/LayoutProvider';
import Scroll from '../../elements/Scroll';
import ScrollFull from '../../elements/ScrollFull';
import { Button, ButtonSmall, Title } from '../../elements/Typography';

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

const Terminated = ({ className }: IStartProps): JSX.Element => {
  const { leaveGame } = useGameServer();

  return (
    <ScrollFull className={className}>
      <Title>GAME TERMINATED</Title>
      <ButtonSmall onClick={() => leaveGame()}>Start over</ButtonSmall>
    </ScrollFull>
  );
};

export default Terminated;
