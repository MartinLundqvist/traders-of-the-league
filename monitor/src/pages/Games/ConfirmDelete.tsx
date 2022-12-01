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
import {
  useChats,
  useGames,
  useMutateGamesAndChats,
  useQueryArray,
} from '../../hooks';

const ConfirmDelete = (): JSX.Element => {
  const gameUuids = useQueryArray();
  const navigate = useNavigate();
  const mutateGamesandChats = useMutateGamesAndChats();

  return (
    <Container>
      {!mutateGamesandChats.isSuccess && (
        <>
          <Alert variant='danger'>Confirm deletion</Alert>
          <Row>
            <Col>
              <DeleteGamesCard gameUuids={gameUuids} />
            </Col>
            <Col>
              <DeleteChatsCard gameUuids={gameUuids} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='d-flex gap-2 pt-2'>
                <Button variant='warning' onClick={() => navigate('/games')}>
                  Abort
                </Button>
                <Button
                  variant='danger'
                  onClick={() => mutateGamesandChats.mutate(gameUuids)}
                >
                  Confirm
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
      <div className='pt-2'>
        {mutateGamesandChats.isLoading && (
          <Alert variant='info'>Loading...</Alert>
        )}
        {mutateGamesandChats.isError && (
          <Alert variant='danger'>
            Error. You need to be Game Administrator to perform this action.
            Server reports: {JSON.stringify(mutateGamesandChats.error)}
          </Alert>
        )}
        {mutateGamesandChats.data && (
          <Alert variant='success'>
            Server reports: {JSON.stringify(mutateGamesandChats.data.message)}
          </Alert>
        )}
      </div>
      {mutateGamesandChats.isSuccess && (
        <Button onClick={() => navigate('/games')}>Back</Button>
      )}
    </Container>
  );
};

const DeleteGamesCard = ({
  gameUuids,
}: {
  gameUuids: string[];
}): JSX.Element => {
  const { isLoading, data: games } = useGames();

  const findGame = (uuid: string) =>
    games && games.find((game) => game.uuid === uuid);

  if (isLoading) return <Spinner animation='border' role='status'></Spinner>;

  return (
    <Card>
      <Card.Header>
        <Badge>{gameUuids.length}</Badge> Games Objects will be deleted
      </Card.Header>
      <Card.Body>
        <Card.Title>Games</Card.Title>
        <Card.Text>
          {gameUuids.map((uuid) => (
            <li key={uuid}>
              {findGame(uuid)?.name} ({findGame(uuid)?.state.status})
            </li>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const DeleteChatsCard = ({
  gameUuids,
}: {
  gameUuids: string[];
}): JSX.Element => {
  const { isLoading: isLoadingGames, data: games } = useGames();
  const { isLoading: isLoadingChats, data: chats } = useChats();

  const findGame = (uuid: string) =>
    games && games.find((game) => game.uuid === uuid);

  const findChat = (uuid: string) =>
    chats && chats.find((chat) => chat.gameUuid === uuid);

  if (isLoadingGames || isLoadingChats)
    return <Spinner animation='border' role='status'></Spinner>;

  return (
    <Card>
      <Card.Header>
        <Badge>{gameUuids.length}</Badge> Chat Objects will be deleted
      </Card.Header>
      <Card.Body>
        <Card.Title>Chats</Card.Title>
        <Card.Text>
          {gameUuids.map((uuid) => (
            <li key={uuid}>
              {findGame(uuid)?.name}{' '}
              <Badge>{findChat(uuid)?.messages.length ?? '-'}</Badge>
            </li>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ConfirmDelete;
