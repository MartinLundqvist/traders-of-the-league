import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import { ITable, TTableDataRow } from '../types';
import { sortDataRows } from '../utils/sortDataRows';
import { SortButton } from './Buttons';

const SortedTable = ({ table }: { table: ITable }): JSX.Element => {
  const [sortingState, setSortingState] = useState<
    { active: boolean; ascending: boolean }[]
  >([]);
  const [sortedData, setSortedData] = useState<TTableDataRow[]>([]);

  const { columns, keys, badges, data } = table;

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

    let _initialSortingState = columns.map((column, index) => ({
      active: false,
      ascending: true,
    }));
    _initialSortingState[0].active = true;
    setSortingState(_initialSortingState);
  }, [columns, data]);

  useEffect(() => {
    const sortTable = () => {
      const index = sortingState.findIndex((state) => state.active === true);

      if (index < 0) {
        console.log('Error');
        return;
      }

      setSortedData((_sortedData) =>
        sortDataRows([..._sortedData], index, sortingState[index].ascending)
      );
    };

    console.log(sortingState);

    sortingState.length > 0 && sortTable();
  }, [sortingState]);

  if (sortingState.length === 0) return <></>;

  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={column}>
              <div className='d-flex justify-content-between align-items-center bd-highlight mb-2'>
                <div>{column}</div>
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
        {sortedData.map((row, index) => (
          <tr key={keys[index]}>
            {row.map((cell, index) => (
              <td key={index}>
                {badges[index] ? <Badge>{cell}</Badge> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SortedTable;
