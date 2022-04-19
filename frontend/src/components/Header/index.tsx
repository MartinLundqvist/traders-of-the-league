import { useGameServer } from '../../contexts/GameServerProvider';
import { Title, TitleSmall } from '../../elements/Typography';
import logo from '../../favicon.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 1rem 0 1rem;

  .logo {
    display: inline-block;
    height: 2.5rem;
    width: 2.2rem;
    background-image: url('${logo}');
    background-size: cover;
    margin-right: 1rem;
  }
`;

interface IHeaderProps {
  className: string;
}

const Header = ({ className }: IHeaderProps) => {
  const { session, game } = useGameServer();

  return (
    <Wrapper className={className}>
      <Title>
        <div className='logo'></div>Traders of the Hanseatic League
      </Title>
      {game && <TitleSmall>Playing: {game?.name} </TitleSmall>}
      <TitleSmall>
        {session.user.name ? session.user.name : 'Not registered'}
      </TitleSmall>
    </Wrapper>
  );
};

export default Header;
