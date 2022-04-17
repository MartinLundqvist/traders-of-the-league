import styled from 'styled-components';
import { useGame } from '../../contexts/GameProvider';
import { ButtonSmall } from '../../elements/Typography';
import { Player } from './Player';

const Wrapper = styled.div`
  position: relative;
  align-self: end;
  display: flex;
  justify-content: flex-start;
  background-color: var(--color-fill-sea-opaque);

  width: 100%;
  height: 75%;
  padding: 1rem;
  gap: 0.5rem;
`;

interface IFooterProps {
  className: string;
}

const Footer = ({ className }: IFooterProps): JSX.Element => {
  const { players, dealContracts } = useGame();

  return (
    <Wrapper className={className}>
      {players.map((player) => (
        <Player player={player} key={player.uuid} />
      ))}
      <ButtonSmall onClick={() => dealContracts()}>Start</ButtonSmall>
    </Wrapper>
  );
};

export default Footer;
