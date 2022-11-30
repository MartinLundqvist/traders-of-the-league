import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useChats, useGames, useQueryArray } from '../../hooks';

const ConfirmDelete = (): JSX.Element => {
  const gameUuids = useQueryArray();
  const navigate = useNavigate();
  const { isLoading: isLoadingGames, data: games } = useGames();
  const { isLoading: isLoadingChats, data: chats } = useChats();

  const findGame = (uuid: string) =>
    games && games.find((game) => game.uuid === uuid);

  const findChat = (uuid: string) =>
    chats && chats.find((chat) => chat.gameUuid === uuid);

  const handleConfirmDelete = async () => {};

  if (isLoadingGames || isLoadingChats)
    return <Spinner animation='border' role='status'></Spinner>;

  return (
    <Container>
      <Alert variant='danger'>Confirm deletion</Alert>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Badge>{gameUuids.length}</Badge> Games Objects will be deleted
            </Card.Header>
            <Card.Body>
              <Card.Title>Games</Card.Title>
              <Card.Text>
                {gameUuids.map((uuid) => (
                  <div key={uuid}>
                    {findGame(uuid)?.name} ({findGame(uuid)?.state.status})
                  </div>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Badge>{gameUuids.length}</Badge> Chat Objects will be deleted
            </Card.Header>
            <Card.Body>
              <Card.Title>Chats</Card.Title>
              <Card.Text>
                {gameUuids.map((uuid) => (
                  <div key={uuid}>
                    {findGame(uuid)?.name}{' '}
                    <Badge>{findChat(uuid)?.messages.length ?? '-'}</Badge>
                  </div>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='d-flex gap-2 pt-2'>
            <Button variant='warning' onClick={() => navigate('/games')}>
              Abort
            </Button>
            <Button variant='danger' onClick={() => handleConfirmDelete()}>
              Confirm
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmDelete;
