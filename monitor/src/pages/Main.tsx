import {
  Alert,
  Badge,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';

import {
  useBugReports,
  useGames,
  usePlayers,
  useServerStatus,
  useSessions,
} from '../hooks';
import { lessThanTwoDaysOld } from '../utils/dateChecks';

const Main = (): JSX.Element => {
  return (
    <Container>
      <ServerOnlineAlert />
      <Row xs={1} md={2} className='g-4'>
        <Col>
          <GameCard />
        </Col>
        <Col>
          <PlayerCard />
        </Col>
        <Col>
          <BugReportCard />
        </Col>
        <Col>
          <SessionCard />
        </Col>
      </Row>
    </Container>
  );
};

const GameCard = (): JSX.Element => {
  const { isLoading, isError, data: games } = useGames();

  if (isLoading) return <Spinner animation='border' role='status'></Spinner>;
  if (isError) return <div>Error</div>;

  return (
    <Card>
      <Card.Header>Game status</Card.Header>
      <Card.Body>
        <Card.Title>Games</Card.Title>
        <Card.Text>
          There are <Badge>{games?.length}</Badge> games in the database, of
          which{' '}
          <Badge>
            {games?.filter((game) => game.state.status === 'playing').length}{' '}
          </Badge>{' '}
          are being played currently and{' '}
          <Badge>
            {games?.filter((game) => game.state.status === 'won').length}{' '}
          </Badge>{' '}
          have been won
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
const SessionCard = (): JSX.Element => {
  const { isLoading, isError, data: sessions } = useSessions();

  if (isLoading) return <Spinner animation='border' role='status'></Spinner>;
  if (isError) return <div>Error</div>;

  return (
    <Card>
      <Card.Header>Session status</Card.Header>
      <Card.Body>
        <Card.Title>Sessions</Card.Title>
        <Card.Text>
          There are <Badge>{sessions?.length}</Badge> sessions in the database,
          of which{' '}
          <Badge>
            {
              sessions?.filter((session) => session.user.connected === true)
                .length
            }{' '}
          </Badge>{' '}
          are currently connected{' '}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
const PlayerCard = (): JSX.Element => {
  const { isLoading, isError, data: players } = usePlayers();

  if (isLoading) return <Spinner animation='border' role='status'></Spinner>;
  if (isError) return <div>Error</div>;

  return (
    <Card>
      <Card.Header>Player status</Card.Header>
      <Card.Body>
        <Card.Title>Players</Card.Title>
        <Card.Text>
          There are <Badge>{players?.length}</Badge> players in the database, of
          which{' '}
          <Badge>
            {players?.filter((player) => player.logins_count > 5).length}{' '}
          </Badge>{' '}
          played more than five games{' '}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
const BugReportCard = (): JSX.Element => {
  const { isLoading, isError, data: bugReports } = useBugReports();

  if (isLoading) return <Spinner animation='border' role='status'></Spinner>;
  if (isError) return <div>Error</div>;

  return (
    <Card>
      <Card.Header>Bug Report status</Card.Header>
      <Card.Body>
        <Card.Title>BugReports</Card.Title>
        <Card.Text>
          There are <Badge>{bugReports?.length}</Badge> bug reports in the
          database, of which{' '}
          <Badge>
            {
              bugReports?.filter((report) => lessThanTwoDaysOld(report.date))
                .length
            }{' '}
          </Badge>{' '}
          are less than two days old{' '}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const ServerOnlineAlert = (): JSX.Element => {
  const { isLoading, isError, data } = useServerStatus();

  if (isLoading) return <Spinner animation='border' role='status'></Spinner>;
  if (isError) return <div>Error</div>;

  return (
    <Alert variant={data?.message === 'Ok' ? 'success' : 'danger'}>
      Server health check is{' '}
      {data?.message === 'Ok' ? 'passing' : 'not passing!'}
    </Alert>
  );
};

export default Main;
