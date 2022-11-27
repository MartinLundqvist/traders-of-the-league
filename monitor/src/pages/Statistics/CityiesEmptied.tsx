import { useMemo } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { IGame } from '../../../../shared/types';
import { RenderBadgeCell } from '../../components/RenderBadgeCell';
import SortedTable, {
  createColumnDefs,
  createData,
} from '../../components/SortedTable';
import { useGames } from '../../hooks';
import { citiesEmptied } from '../../utils/gameStatistics';

const createTable = (games: IGame[]) => {
  const cityStats = citiesEmptied(games);

  const columnDefs = createColumnDefs([
    { name: 'City' },
    { name: '#', cellRenderer: RenderBadgeCell },
  ]);

  const data = createData(cityStats.map((cs) => [cs.cityName, cs.nrEmpties]));

  return { columnDefs, data };
};

const CitiesEmptied = (): JSX.Element => {
  const { isLoading, error, data: games } = useGames();

  const table = useMemo(() => games && createTable(games), [games]);

  if (isLoading || !table) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  //   const cityStats = useMemo(() => {
  //     return games ? citiesEmptied(games) : [];
  //   }, [games]);

  return (
    <Card>
      <Card.Header># Times city was emptied</Card.Header>
      <Card.Body>
        <SortedTable columnDefs={table.columnDefs} data={table.data} />
      </Card.Body>
    </Card>
  );
};

export default CitiesEmptied;
