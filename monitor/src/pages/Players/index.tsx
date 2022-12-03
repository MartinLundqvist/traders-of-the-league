import { useMemo } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IAuth0User } from '../../../../shared/types';
import { RenderVerifiedBadgeCell } from '../../components/RenderBadgeCell';
import SortedTable, {
  createColumnDefs,
  createData,
} from '../../components/SortedTable';
import { useAdmin, usePlayers } from '../../hooks';
import { stringToLocalDate } from '../../utils/dateRenderers';

const createTable = (players: IAuth0User[]) => {
  const columnDefs = createColumnDefs([
    { name: 'User name' },
    { name: 'Email address' },
    { name: 'Email verified', cellRenderer: RenderVerifiedBadgeCell },
    { name: 'Joined', cellRenderer: stringToLocalDate },
    { name: 'Last login', cellRenderer: stringToLocalDate },
  ]);

  const data = createData(
    players.map((player) => [
      player.user_id,
      player.name,
      player.email,
      player.email_verified,
      player.created_at,
      player.last_login,
    ]),
    true
  );

  return { columnDefs, data };
};

const Players = (): JSX.Element => {
  const { isLoading, error, data: players } = usePlayers();
  const navigate = useNavigate();
  const isAdmin = useAdmin();

  const confirmDeleteSelection = (selection: string[]) => {
    let query = '?';
    selection.forEach((key) => {
      query += key + '&';
    });

    // console.log(query);

    navigate('/players/confirmdelete' + query);
  };

  const actions = [
    {
      label: 'Delete',
      action: confirmDeleteSelection,
    },
  ];

  const table = useMemo(() => players && createTable(players), [players]);

  if (error) return <Container>{JSON.stringify(error.message)}</Container>;

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

export default Players;
