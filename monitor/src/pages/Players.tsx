import { Badge, Spinner, Table } from 'react-bootstrap';
import { useData } from '../contexts/DataProvider';

const Players = (): JSX.Element => {
  const { players, hasLoaded } = useData();

  const stringToLocalDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toDateString();
    // return date.toLocaleString();
  };

  if (!hasLoaded) {
    return <Spinner animation='border' role='status'></Spinner>;
  }
  return (
    <>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>User name</th>
            <th>Email address</th>
            <th>Email verified?</th>
            <th>Joined</th>
            <th>Last login</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.user_id + index}>
              <td>{player.name}</td>
              <td>{player.email}</td>
              <td>
                <Badge bg={player.email_verified ? 'success' : 'warning'}>
                  {player.email_verified ? 'Verified' : 'Not Verified'}
                </Badge>
              </td>
              <td>{stringToLocalDate(player.created_at)}</td>
              <td>{stringToLocalDate(player.last_login)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Players;
