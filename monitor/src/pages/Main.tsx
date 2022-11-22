import { Alert, Badge, Card, Col, Row, Spinner } from 'react-bootstrap';
import { useGames, useServerStatus, useSessions } from '../hooks';

const Main = (): JSX.Element => {
  // const { games, sessions, serverOnline, hasLoaded } = useData();

  // if (!hasLoaded) {
  //   return <Spinner animation='border' role='status'></Spinner>;
  // }

  return (
    <>
      <ServerOnlineAlert />
      {/* <Alert variant={serverOnline ? 'success' : 'danger'}>
        Server health check is {serverOnline ? 'passing' : 'not passing!'}
      </Alert> */}
      <Row xs={1} md={2} className='g-4'>
        <Col>
          <GameCard />
          {/* <Card>
            <Card.Header>Game status</Card.Header>
            <Card.Body>
              <Card.Title>Games</Card.Title>
              <Card.Text>
                There are <Badge>{games.length}</Badge> games in the database,
                of which{' '}
                <Badge>
                  {
                    games.filter((game) => game.state.status === 'playing')
                      .length
                  }{' '}
                </Badge>{' '}
                are being played currently and{' '}
                <Badge>
                  {games.filter((game) => game.state.status === 'won').length}{' '}
                </Badge>{' '}
                have been won
              </Card.Text>
            </Card.Body>
          </Card> */}
        </Col>
        <Col>
          <SessionCard />
          {/* <Card>
            <Card.Header>Session status</Card.Header>
            <Card.Body>
              <Card.Title>Sessions</Card.Title>
              <Card.Text>
                There are <Badge>{sessions.length}</Badge> sessions in the
                database, of which{' '}
                <Badge>
                  {
                    sessions.filter(
                      (session) => session.user.connected === true
                    ).length
                  }{' '}
                </Badge>{' '}
                are currently connected{' '}
              </Card.Text>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </>
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
