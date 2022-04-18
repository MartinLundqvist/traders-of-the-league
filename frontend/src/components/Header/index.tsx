import { useGameServer } from '../../contexts/GameServerProvider';
import { Title, TitleSmall } from '../../elements/Typography';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 1rem 0 1rem;
`;

interface IHeaderProps {
  className: string;
}

const Header = ({ className }: IHeaderProps) => {
  const { session } = useGameServer();

  return (
    <Wrapper className={className}>
      <Title>Traders of the Hanseatic League</Title>
      <TitleSmall>
        {session.user.name ? session.user.name : 'Not registered'}
      </TitleSmall>
    </Wrapper>
  );
};

export default Header;
