import { useMemo } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { IGame } from '../../../../shared/types';
import { RenderBadgeCell } from '../../components/RenderBadgeCell';
import SortedTable, {
  createColumnDefs,
  createData,
} from '../../components/SortedTable';
import { useGames } from '../../hooks';
import { contractsFulFilled } from '../../utils/gameStatistics';

const createTable = (games: IGame[]) => {
  const contractStats = contractsFulFilled(games);

  const columnDefs = createColumnDefs([
    { name: 'Contract' },
    { name: 'Region' },
    { name: 'Color 1' },
    { name: 'Color 2' },
    { name: 'Value', cellRenderer: RenderBadgeCell },
    { name: '#', cellRenderer: RenderBadgeCell },
  ]);

  const data = createData(
    contractStats.map((cs) => [
      cs.uuid,
      cs.region,
      cs.color_1,
      cs.color_2,
      cs.value,
      cs.nrFulFilled,
    ])
  );

  return { columnDefs, data };
};

const ContractsFulfilled = (): JSX.Element => {
  const { isLoading, error, data: games } = useGames();

  const table = useMemo(() => games && createTable(games), [games]);

  if (isLoading || !table) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Card>
      <Card.Header># Times contract was fulfilled</Card.Header>
      <Card.Body>
        <SortedTable columnDefs={table.columnDefs} data={table.data} />
      </Card.Body>
    </Card>
  );
};

export default ContractsFulfilled;
