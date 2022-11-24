import { useEffect, useMemo, useState } from 'react';
import { Badge, Container, Spinner, Table } from 'react-bootstrap';
// import { QueryClient } from '@tanstack/react-query';
// import { useLoaderData } from 'react-router-dom';
import { IGame } from '../../../shared/types';
import { useGames } from '../hooks';

// const gamesQuery = () => {
//   const url = import.meta.env.VITE_URL;

//   const queryKey = 'games';
//   const queryFn = async () => {
//     let games = [];
//     const raw = await fetch(`${url}/games`);
//     if (raw.ok) {
//       games = await raw.json();
//     }
//     return games;
//   };

//   return { queryKey, queryFn };
// };

// export const loader =
//   (queryClient: QueryClient, queryKey = 'games') =>
//   async () => {
//     return (
//       queryClient.getQueryData('games') ??
//       (await queryClient.fetchQuery(gamesQuery()))
//     );
//   };

type TTableDataRow = (string | number)[];

const createTable = (games: IGame[]) => {
  const columns = ['Game name', 'Status', '# players'];

  const data: TTableDataRow[] = [];

  games.forEach((game) => {
    data.push([game.uuid, game.name, game.state.status, game.players.length]);
  });

  return { columns, data };
};

const Games = (): JSX.Element => {
  const { isLoading, error, data: games } = useGames();
  // const games = useLoaderData() as IGame[];
  const [sortedData, setSortedData] = useState<TTableDataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const table = useMemo(() => games && createTable(games), [games]);

  useEffect(() => {
    if (table) {
      setColumns(table.columns);
      setSortedData(table.data);
    }
  }, [table]);

  if (isLoading) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={row[0]}>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>
                <Badge>{row[3]}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Games;
