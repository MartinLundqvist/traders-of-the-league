import { TTableDataRow } from '../components/SortedTable';

export const sortDataRows = (
  dataRows: TTableDataRow[],
  index: number,
  ascending = true
): TTableDataRow[] => {
  return dataRows.sort((a, b) => {
    if (a[index] > b[index]) return ascending ? 1 : -1;
    if (b[index] > a[index]) return ascending ? -1 : 1;

    return 0;
  });
};
