import { useMemo } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { IRanking } from '../../../shared/types';
import { RenderBadgeCell } from '../components/RenderBadgeCell';
import SortedTable, {
  createColumnDefs,
  createData,
} from '../components/SortedTable';
import { useRankings } from '../hooks';

const createTable = (rankings: IRanking[]) => {
  const columnDefs = createColumnDefs([
    { name: 'User name' },
    { name: 'Ranked games', cellRenderer: RenderBadgeCell },
    { name: 'Current ranking', cellRenderer: RenderBadgeCell },
  ]);

  const data = createData(
    rankings.map((ranking) => [
      ranking.user.name,
      ranking.rankingHistory.length,
      ranking.currentRanking,
    ])
  );

  return { columnDefs, data };
};

const Rankings = (): JSX.Element => {
  const { isLoading, error, data: rankings } = useRankings();

  const table = useMemo(() => rankings && createTable(rankings), [rankings]);

  if (isLoading || !table) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <SortedTable columnDefs={table.columnDefs} data={table.data} />
    </Container>
  );
};

export default Rankings;
