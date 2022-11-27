import { useEffect, useState } from 'react';
import { Container, Pagination, Table } from 'react-bootstrap';
import { sortDataRows } from '../utils/sortDataRows';
import { SortButton } from './Buttons';
import { nanoid } from 'nanoid';

export type TTableDataRow = (string | number | boolean)[];

export interface ITableColumnDef {
  name: string;
  cellRenderer?: (children: any) => JSX.Element | string | number;
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
  rowsPerPage?: number;
}

const SortedTable = ({
  columnDefs,
  data,
  rowsPerPage = 15,
}: ISortedTable): JSX.Element => {
  const [sortingState, setSortingState] = useState<
    { active: boolean; ascending: boolean }[]
  >([]);
  const [sortedData, setSortedData] = useState<TTableDataRow[]>([]);
  const [showPage, setShowPage] = useState(1);

  const lastPage = Math.ceil(data.length / rowsPerPage);

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

  const handlePageButtonClick = (increment: number) => {
    if (showPage + increment > lastPage) {
      setShowPage(1);
      return;
    }

    if (showPage + increment < 1) {
      setShowPage(lastPage);
      return;
    }

    setShowPage((_prevPage) => _prevPage + increment);
  };

  useEffect(() => {
    setSortedData(data);

    let _initialSortingState = columnDefs.map((column, index) => ({
      active: false,
      ascending: true,
    }));
    _initialSortingState[0].active = true;
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

    sortingState.length > 0 && sortTable();
  }, [sortingState]);

  if (sortingState.length === 0) return <></>;

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
        {sortedData
          .slice((showPage - 1) * rowsPerPage, showPage * rowsPerPage)
          .map((row, rowIndex) => (
            <tr key={row[0] as string}>
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
      <tfoot>
        <tr>
          <td colSpan={columnDefs.length}>
            <div className='d-flex justify-content-center align-items pt-2'>
              <Pagination>
                <Pagination.First onClick={() => setShowPage(1)} />
                <Pagination.Prev onClick={() => handlePageButtonClick(-1)} />
                <Pagination.Item>
                  Page {showPage} / {lastPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => handlePageButtonClick(1)} />
                <Pagination.Last onClick={() => setShowPage(lastPage)} />
              </Pagination>
            </div>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default SortedTable;
