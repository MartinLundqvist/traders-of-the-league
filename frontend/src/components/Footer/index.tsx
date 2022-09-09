import styled from 'styled-components';
import { Controls } from './Controls';
import { Game } from './Game';
import { Players } from './Players';

const Wrapper = styled.div`
  position: relative;
  align-self: end;
  display: flex;
  justify-content: space-between;
  /*   
  background-color: var(--color-fill-sea-opaque);
  box-shadow: 0 -3px 5px var(--color-bg-shadow); */

  width: 100%;
  height: 100%;
  padding: 0.25rem 1rem 0.25rem 1rem;
  gap: 0.5rem;

  isolation: isolate;

  background: linear-gradient(
    var(--color-background-medium),
    var(--color-background-dark)
  );
  border-top: 2px solid black;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 5px;
    width: 100%;
    border-bottom: 2px solid black;
    z-index: -1;
  }
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
