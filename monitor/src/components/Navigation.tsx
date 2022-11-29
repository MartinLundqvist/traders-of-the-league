import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { LinkContainer } from 'react-router-bootstrap';
import {
  AuthButton,
  FetchWonGameDataButton,
  RefreshDataButton,
} from './Buttons';

const Navigation = (): JSX.Element => {
  const queryClient = useQueryClient();

  return (
    <Container>
      <Col>
        <Row>
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
            </Nav>
          </Navbar>
        </Row>
        <Row>
          <RefreshDataButton />
        </Row>
        <Row>
          <FetchWonGameDataButton />
        </Row>
        <Row>
          <AuthButton />
        </Row>
      </Col>
    </Container>
  );
};

export default Navigation;
