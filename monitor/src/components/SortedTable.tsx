import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import { sortDataRows } from '../utils/sortDataRows';
import { SortButton } from './Buttons';
import { nanoid } from 'nanoid';

export type TTableDataRow = (string | number)[];

export interface ITableColumnDef {
  name: string;
  cellRenderer?: (children: React.ReactNode) => JSX.Element;
}

interface IInnerTableColumnDef extends ITableColumnDef {
  key: string;
}

export const createColumnDefs = (
  columnDefs: ITableColumnDef[]
): IInnerTableColumnDef[] => {
  let results: IInnerTableColumnDef[] = [];

  results = columnDefs.map((col) => ({ key: nanoid(), ...col }));

  return results;
};

export const createData = (dataRows: TTableDataRow[]): TTableDataRow[] => {
  let results: TTableDataRow[] = [];

  results = dataRows.map((row) => [nanoid(), ...row]);

  return results;
};

export interface ISortedTable {
  columnDefs: IInnerTableColumnDef[];
  data: TTableDataRow[];
}

const SortedTable = ({ table }: { table: ISortedTable }): JSX.Element => {
  const [sortingState, setSortingState] = useState<
    { active: boolean; ascending: boolean }[]
  >([]);
  const [sortedData, setSortedData] = useState<TTableDataRow[]>([]);

  const { columnDefs, data } = table;

  const handleSortButtonClick = (index: number) => {
    let _newSortingState = [...sortingState];
    const { active } = sortingState[index];

    if (active) {
      _newSortingState[index].ascending = !_newSortingState[index].ascending;
    } else {
      _newSortingState = _newSortingState.map((state) => ({
        ...state,
        active: false,
      }));
      _newSortingState[index].active = true;
    }

    setSortingState(_newSortingState);
  };

  useEffect(() => {
    setSortedData(data);

    let _initialSortingState = columnDefs.map((column, index) => ({
      active: false,
      ascending: true,
    }));
    // _initialSortingState = [{active: false, ascending: true}, ..._initialSortingState];
    _initialSortingState[1].active = true;
    setSortingState(_initialSortingState);
  }, [columnDefs, data]);

  useEffect(() => {
    const sortTable = () => {
      const index = sortingState.findIndex((state) => state.active === true);

      if (index < 0) {
        console.log('Error');
        return;
      }

      setSortedData((_sortedData) =>
        sortDataRows([..._sortedData], index + 1, sortingState[index].ascending)
      );
    };

    // console.log(sortingState);

    sortingState.length > 0 && sortTable();
  }, [sortingState]);

  if (sortingState.length === 0) return <></>;

  // console.log(sortedData);

  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          {columnDefs.map((column, index) => (
            <th key={column.key}>
              <div className='d-flex justify-content-between align-items-center bd-highlight mb-2'>
                <div>{column.name}</div>
                <SortButton
                  onClick={() => handleSortButtonClick(index)}
                  active={sortingState[index].active}
                  ascending={sortingState[index].ascending}
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={row[0]}>
            {row.slice(1).map((cell, colIndex) => (
              <td key={colIndex}>
                {columnDefs[colIndex].cellRenderer
                  ? columnDefs[colIndex].cellRenderer!(cell)
                  : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SortedTable;
