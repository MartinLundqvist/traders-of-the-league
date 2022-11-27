import { table } from 'console';
import { useMemo } from 'react';
import { Badge, Container, Spinner, Table } from 'react-bootstrap';
import { IChat, IGame } from '../../../shared/types';
import { RenderBadgeCell } from '../components/RenderBadgeCell';
import SortedTable, {
  createColumnDefs,
  createData,
} from '../components/SortedTable';
import { useChats, useGames } from '../hooks';

const createTable = (chats: IChat[], games: IGame[]) => {
  const columnDefs = createColumnDefs([
    { name: 'Game name' },
    { name: '# messages', cellRenderer: RenderBadgeCell },
  ]);

  let data = createData(
    chats.map((chat) => {
      const game = games.find((game) => game.uuid === chat.gameUuid);

      return [game?.name ?? '(Not found)', chat.messages.length];
    })
  );

  // data = createData(data);

  return { columnDefs, data };
};

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

  const table = useMemo(
    () => games && chats && createTable(chats, games),
    [games, chats]
  );

  if (isLoadingGames || isLoadingChats || !table) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <SortedTable columnDefs={table.columnDefs} data={table.data} />
    </Container>
  );
};

export default Chats;
