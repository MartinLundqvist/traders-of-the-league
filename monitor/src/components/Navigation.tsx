import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = (): JSX.Element => {
  const queryClient = useQueryClient();

  return (
    <Container>
      <Navbar>
        <Nav className='flex-column'>
          <Nav.Item>
            <LinkContainer to='home'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item>
            <LinkContainer to='games'>
              <Nav.Link>Games</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='sessions'>
              <Nav.Link>Sessions</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='chats'>
              <Nav.Link>Chats</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='players'>
              <Nav.Link>Players</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='rankings'>
              <Nav.Link>Rankings</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='statistics'>
              <Nav.Link>Statistics</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Button onClick={() => queryClient.refetchQueries()}>
            Refresh data
          </Button>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Navigation;
