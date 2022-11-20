import { Badge, Spinner, Table } from 'react-bootstrap';
import { useData } from '../contexts/DataProvider';

const Games = (): JSX.Element => {
  const { games, hasLoaded } = useData();

  if (!hasLoaded) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>Game name</th>
            <th>Status</th>
            <th># players</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={game.uuid + index}>
              <td>{game.name}</td>
              <td>{game.state.status}</td>
              <td>
                <Badge>{game.players.length}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Games;
