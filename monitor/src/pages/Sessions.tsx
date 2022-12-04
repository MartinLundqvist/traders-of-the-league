import { useMemo } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { ISession } from '../../../shared/types';
import { RenderConnectedBadgeCell } from '../components/RenderBadgeCell';
import SortedTable, {
  createColumnDefs,
  createData,
} from '../components/SortedTable';
import { useSessions } from '../hooks';

const createTable = (sessions: ISession[]) => {
  const columnDefs = createColumnDefs([
    { name: 'User name' },
    { name: 'E-Mail' },
    { name: 'Connected', cellRenderer: RenderConnectedBadgeCell },
  ]);

  const data = createData(
    sessions.map((session) => [
      session.user.name,
      session.email,
      session.user.connected,
    ])
  );

  return { columnDefs, data };
};

const Sessions = (): JSX.Element => {
  const { isLoading, error, data: sessions } = useSessions();

  const table = useMemo(() => sessions && createTable(sessions), [sessions]);

  if (isLoading || !table) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <SortedTable columnDefs={table.columnDefs} data={table.data} />
    </Container>
  );
};

export default Sessions;
