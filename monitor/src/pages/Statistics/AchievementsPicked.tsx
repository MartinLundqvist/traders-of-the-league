import { useMemo } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { IGame } from '../../../../shared/types';
import { RenderBadgeCell } from '../../components/RenderBadgeCell';
import SortedTable, {
  createColumnDefs,
  createData,
} from '../../components/SortedTable';
import { useGames } from '../../hooks';
import { achievementsCount, citiesEmptied } from '../../utils/gameStatistics';

const createTable = (games: IGame[]) => {
  const achievementStats = achievementsCount(games);

  const columnDefs = createColumnDefs([
    { name: 'Achievement' },
    { name: 'ID' },
    { name: '# Times Featured', cellRenderer: RenderBadgeCell },
    { name: '# Times Picked', cellRenderer: RenderBadgeCell },
  ]);

  const data = createData(
    achievementStats.map((as) => [
      as.uuid,
      as.name,
      as.uuid,
      as.nrFeatured,
      as.nrPicked,
    ]),
    true
  );

  return { columnDefs, data };
};

const AchievementsPicked = (): JSX.Element => {
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
      <Card.Header># Times achievement was used</Card.Header>
      <Card.Body>
        <SortedTable columnDefs={table.columnDefs} data={table.data} />
      </Card.Body>
    </Card>
  );
};

export default AchievementsPicked;
