import { useMemo } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { IBugReport } from '../../../../shared/types';
import { RenderPriorityBadgeCell } from '../../components/RenderBadgeCell';
import { RenderBugReportLink } from '../../components/RenderLink';
import SortedTable, {
  createColumnDefs,
  createData,
} from '../../components/SortedTable';
import { useBugReports } from '../../hooks';
import { UTCStringToLocalDate } from '../../utils/dateRenderers';

const createTable = (bugReports: IBugReport[]) => {
  const columnDefs = createColumnDefs([
    { name: 'Date', cellRenderer: UTCStringToLocalDate },
    { name: 'E-Mail' },
    { name: 'Priority', cellRenderer: RenderPriorityBadgeCell },
    { name: 'Report', cellRenderer: RenderBugReportLink },
  ]);

  const data = createData(
    bugReports.map((bugReport) => [
      bugReport.date as unknown as string,
      bugReport.email,
      bugReport.userReport.priority,
      bugReport.date as unknown as string,
    ])
  );

  return { columnDefs, data };
};

const BugReports = (): JSX.Element => {
  const { isLoading, error, data: bugreports } = useBugReports();

  const table = useMemo(
    () => bugreports && createTable(bugreports),
    [bugreports]
  );

  if (isLoading || !table) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  return (
    <Container>
      <SortedTable columnDefs={table.columnDefs} data={table.data} />
    </Container>
  );
};

export default BugReports;
