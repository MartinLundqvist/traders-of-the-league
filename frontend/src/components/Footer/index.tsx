import styled from 'styled-components';
import { Controls } from './Controls';
import { GameState } from './GameState';
import { Players } from './Players';

// Game status to take care of:
// - Not started vs started.
// - Which round are we in?
// - Whose move is it?
//

const Wrapper = styled.div`
  position: relative;
  align-self: end;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-fill-sea-opaque);

  width: 100%;
  height: 100%;
  padding: 0.25rem 1rem 0.25rem 1rem;
  gap: 0.5rem;
`;

interface IFooterProps {
  className: string;
}

const Footer = ({ className }: IFooterProps): JSX.Element => {
  return (
    <Wrapper className={className}>
      <GameState />
      <Players />
      <Controls />
    </Wrapper>
  );
};

export default Footer;
