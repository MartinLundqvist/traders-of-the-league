import { useMemo } from 'react';
import { Badge, Container, Spinner } from 'react-bootstrap';
import { IGame } from '../../../shared/types';
import SortedTable from '../components/SortedTable';
import { useGames } from '../hooks';
import {
  TTableDataRow,
  createData,
  createColumnDefs,
} from '../components/SortedTable';

const createTable = (games: IGame[]) => {
  const columnDefs = createColumnDefs([
    { name: 'Game name' },
    { name: 'Status' },
    {
      name: '# players',
      cellRenderer: (children: React.ReactNode) => <Badge>{children}</Badge>,
    },
  ]);

  let data: TTableDataRow[] = [];

  games.forEach((game) => {
    data.push([game.name, game.state.status, game.players.length]);
  });

  data = createData(data);

  return { columnDefs, data };
};

const Games = (): JSX.Element => {
  const { isLoading, error, data: games } = useGames();

  const table = useMemo(() => games && createTable(games), [games]);

  if (isLoading || !table) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <SortedTable table={table} />
    </Container>
  );
};

export default Games;
