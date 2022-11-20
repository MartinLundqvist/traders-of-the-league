import { Button, Nav } from 'react-bootstrap';
import { useData } from '../contexts/DataProvider';
import { useNavigation } from '../contexts/NavigationProvider';

const Navigation = (): JSX.Element => {
  const { activeRoute, setActiveRoute } = useNavigation();
  const { refreshData } = useData();
  return (
    <Nav className='flex-column'>
      <Nav.Link
        active={activeRoute === 'main'}
        onClick={() => setActiveRoute('main')}
      >
        Home
      </Nav.Link>
      <Nav.Link
        active={activeRoute === 'games'}
        onClick={() => setActiveRoute('games')}
      >
        Games
      </Nav.Link>
      <Nav.Link
        active={activeRoute === 'sessions'}
        onClick={() => setActiveRoute('sessions')}
      >
        Sessions
      </Nav.Link>
      <Nav.Link
        active={activeRoute === 'chats'}
        onClick={() => setActiveRoute('chats')}
      >
        Chats
      </Nav.Link>
      <Nav.Link
        active={activeRoute === 'stats'}
        onClick={() => setActiveRoute('stats')}
      >
        Statistics
      </Nav.Link>
      <Nav.Link
        active={activeRoute === 'players'}
        onClick={() => setActiveRoute('players')}
      >
        Players
      </Nav.Link>
      <Nav.Link
        active={activeRoute === 'rankings'}
        onClick={() => setActiveRoute('rankings')}
      >
        Rankings
      </Nav.Link>
      <Button onClick={() => refreshData()}>Refresh data</Button>
    </Nav>
  );
};

export default Navigation;
