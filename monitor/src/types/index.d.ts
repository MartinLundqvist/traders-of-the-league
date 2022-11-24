export type TTableDataRow = (string | number)[];

export interface ITable {
  columns: string[];
  badges: boolean[];
  keys: string[];
  data: TTableDataRow[];
}
