import { useMemo } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { IGame } from '../../../shared/types';
import SortedTable from '../components/SortedTable';
import { useGames } from '../hooks';
import { TTableDataRow } from '../types';

const createTable = (games: IGame[]) => {
  const columns = ['Game name', 'Status', '# players'];

  const badges = [false, false, true];

  const keys: string[] = [];

  const data: TTableDataRow[] = [];

  games.forEach((game) => {
    keys.push(game.uuid);
    data.push([game.name, game.state.status, game.players.length]);
  });

  return { columns, badges, keys, data };
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
