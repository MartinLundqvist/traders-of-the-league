import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';

const Navigation = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

  return (
    <Navbar>
      <Nav className='flex-column'>
        <Nav.Item>
          <Nav.Link href='home' active={pathname === '/home'}>
            Home
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href='games' active={pathname === '/games'}>
            Games
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='sessions' active={pathname === '/sessions'}>
            Sessions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='chats' active={pathname === '/chats'}>
            Chats
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='players' active={pathname === '/players'}>
            Players
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='rankings' active={pathname === '/rankings'}>
            Rankings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='statistics' active={pathname === '/statistics'}>
            Statistics
          </Nav.Link>
        </Nav.Item>
        <Button onClick={() => queryClient.refetchQueries()}>
          Refresh data
        </Button>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
