import { useMemo } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { IGame } from '../../../shared/types';
import SortedTable, {
  createData,
  createColumnDefs,
} from '../components/SortedTable';
import { useGames } from '../hooks';
import { RenderBadgeCell } from '../components/RenderBadgeCell';
import { epochToLocalDate } from '../utils/dateRenderers';

const createTable = (games: IGame[]) => {
  const columnDefs = createColumnDefs([
    { name: 'Started' },
    { name: 'Game name' },
    { name: 'Status' },
    {
      name: '# players',
      cellRenderer: RenderBadgeCell,
    },
  ]);

  const data = createData(
    games.map((game) => [
      epochToLocalDate(game.startTime),
      game.name,
      game.state.status,
      game.players.length,
    ])
  );

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
      <SortedTable columnDefs={table.columnDefs} data={table.data} />
    </Container>
  );
};

export default Games;
