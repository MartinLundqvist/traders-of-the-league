import { useMemo, useRef, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { IGame } from '../../../../shared/types';
import SortedTable, {
  createData,
  createColumnDefs,
} from '../../components/SortedTable';
import { useAdmin, useGames } from '../../hooks';
import { RenderBadgeCell } from '../../components/RenderBadgeCell';
import { epochToLocalDate } from '../../utils/dateRenderers';
import { Outlet, useNavigate } from 'react-router-dom';

const createTable = (games: IGame[]) => {
  const columnDefs = createColumnDefs([
    { name: 'Started', cellRenderer: epochToLocalDate },
    { name: 'Game name' },
    { name: 'Status' },
    {
      name: '# players',
      cellRenderer: RenderBadgeCell,
    },
  ]);

  const data = createData(
    games.map((game) => [
      game.uuid,
      game.startTime || 0,
      game.name,
      game.state.status,
      game.players.length,
    ]),
    true
  );

  return { columnDefs, data };
};

const Games = (): JSX.Element => {
  const { isLoading, error, data: games } = useGames();
  const navigate = useNavigate();
  const isAdmin = useAdmin();

  const consoleLogSelection = (selection: string[]) => {
    console.log(selection);
  };

  const confirmDeleteSelection = (selection: string[]) => {
    let query = '?';
    selection.forEach((key) => {
      query += key + '&';
    });

    navigate('/games/confirmdelete' + query);
  };

  const actions = [
    {
      label: 'Print',
      action: consoleLogSelection,
    },
    {
      label: 'Delete',
      action: confirmDeleteSelection,
    },
  ];

  const table = useMemo(() => games && createTable(games), [games]);

  if (isLoading || !table) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <SortedTable
        columnDefs={table.columnDefs}
        data={table.data}
        editable={isAdmin}
        actions={actions}
      />
    </Container>
  );
};

export default Games;
