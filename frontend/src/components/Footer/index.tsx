import styled from 'styled-components';
import { Controls } from './Controls';
import { Game } from './Game';
import { Players } from './Players';

const Wrapper = styled.div`
  position: relative;
  align-self: end;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 -3px 5px var(--color-bg-shadow);

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
      <Game />
      <Players />
      <Controls />
    </Wrapper>
  );
};

export default Footer;
