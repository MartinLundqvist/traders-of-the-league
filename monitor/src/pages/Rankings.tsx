import { Badge, Spinner, Table } from 'react-bootstrap';
import { useData } from '../contexts/DataProvider';

const Rankings = (): JSX.Element => {
  const { rankings, hasLoaded } = useData();

  if (!hasLoaded) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>User name</th>
            <th>Ranked games</th>
            <th>Current ranking</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => (
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
    </>
  );
};

export default Rankings;
