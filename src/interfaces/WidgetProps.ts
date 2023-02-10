export interface TableCurrencyProps {
  date: string;
  currencyFrom: string;
  currencyTo: string;
  amount1: number | string;
  amount2: number | string;
  type: string;
}

export interface TableProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof TableCurrencyProps;
  label: string;
  numeric: boolean;
}

export interface TableSortProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableCurrencyProps
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
