import { Badge, Container, Spinner, Table } from 'react-bootstrap';
import { useRankings } from '../hooks';

const Rankings = (): JSX.Element => {
  const { isLoading, error, data: rankings } = useRankings();

  if (isLoading) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>User name</th>
            <th>Ranked games</th>
            <th>Current ranking</th>
          </tr>
        </thead>
        <tbody>
          {rankings?.map((ranking, index) => (
            <tr key={ranking.user.uuid + index}>
              <td>{ranking.user.name}</td>
              <td>
                <Badge>{ranking.rankingHistory.length}</Badge>
              </td>
              <td>
                <Badge>{ranking.currentRanking}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Rankings;
