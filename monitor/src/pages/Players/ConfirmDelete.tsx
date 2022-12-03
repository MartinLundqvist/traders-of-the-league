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
import { useMutatePlayers, usePlayers, useQueryArray } from '../../hooks';

const ConfirmDelete = (): JSX.Element => {
  const userIds = useQueryArray();
  const navigate = useNavigate();
  const mutatePlayers = useMutatePlayers();

  return (
    <Container>
      {!mutatePlayers.isSuccess && (
        <>
          <Alert variant='danger'>Confirm deletion</Alert>
          <Row>
            <Col>
              <DeletePlayersCard userIds={userIds} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='d-flex gap-2 pt-2'>
                <Button variant='warning' onClick={() => navigate('/players')}>
                  Abort
                </Button>
                <Button
                  variant='danger'
                  onClick={() => mutatePlayers.mutate(userIds)}
                >
                  Confirm
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
      <div className='pt-2'>
        {mutatePlayers.isLoading && <Alert variant='info'>Loading...</Alert>}
        {mutatePlayers.isError && (
          <Alert variant='danger'>
            Error. You need to be Game Administrator to perform this action.
            Server reports: {JSON.stringify(mutatePlayers.error)}
          </Alert>
        )}
        {mutatePlayers.data && (
          <Alert variant='success'>
            Server reports: {JSON.stringify(mutatePlayers.data.message)}
          </Alert>
        )}
      </div>
      {mutatePlayers.isSuccess && (
        <Button onClick={() => navigate('/players')}>Back</Button>
      )}
    </Container>
  );
};

const DeletePlayersCard = ({ userIds }: { userIds: string[] }): JSX.Element => {
  const { isLoading, data: players } = usePlayers();

  const findPlayer = (userId: string) =>
    players && players.find((player) => player.user_id === userId);

  if (isLoading) return <Spinner animation='border' role='status'></Spinner>;

  return (
    <Card>
      <Card.Header>
        <Badge>{userIds.length}</Badge> Players will be deleted
      </Card.Header>
      <Card.Body>
        <Card.Title>Players</Card.Title>
        <Card.Text>
          {userIds.map((userId) => (
            <li key={userId}>{findPlayer(userId)?.name}</li>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ConfirmDelete;
