import { Badge, Spinner, Table } from 'react-bootstrap';
import { useChats, useGames } from '../hooks';

const Chats = (): JSX.Element => {
  const {
    isLoading: isLoadingGames,
    error: errorGames,
    data: games,
  } = useGames();
  const {
    isLoading: isLoadingChats,
    error: errorChats,
    data: chats,
  } = useChats();

  if (isLoadingGames || isLoadingChats) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>Game name</th>
            <th># messages</th>
          </tr>
        </thead>
        <tbody>
          {chats?.map((chat, index) => (
            <tr key={chat.gameUuid + index}>
              <td>
                {games?.find((game) => game.uuid === chat.gameUuid)?.name}
              </td>
              <td>
                <Badge>{chat.messages.length}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Chats;
