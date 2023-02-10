import {
  Button,
  Grid,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import currencyAPITable from "../../api/currencyAPI";
import { TableCurrencyProps } from "../../interfaces/WidgetProps";
import TableUnitsHead from "./headTableCurrency";

interface TabelCurrencyProps {
  date: string;
  currencyFrom: string;
  currencyTo: string;
  amount1: number | string;
  amount2: number | string;
  type: string;
}

const tableCurrency = currencyAPITable;

function descendingComparator<T>(
  firstItem: T,
  secondItem: T,
  orderBy: keyof T
) {
  if (secondItem[orderBy] < firstItem[orderBy]) {
    return -1;
  }
  if (secondItem[orderBy] > firstItem[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedArray = array.map(
    (element, index) => [element, index] as [T, number]
  );
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order || a[1] - b[1];
  });
  return stabilizedArray.map((element) => element[0]);
}

export function TableCurrency() {
  const memoizedmockTableDataRows = React.useMemo(() => {
    return tableCurrency;
  }, []);

  const [value, setValue] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(8);
  const [rows, setRows] = React.useState<TableCurrencyProps[]>(
    memoizedmockTableDataRows
  );
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof TableCurrencyProps>(
    "currencyTo" && "currencyFrom" && "date" && "amount1" && "amount2" && "type"
  );
  const [dense] = React.useState(false);
  const [selected] = React.useState<readonly string[]>([]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleNavigation = React.useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value - 1);
    },
    []
  );

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, property: keyof TabelCurrencyProps) => {
      setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
      setOrderBy(property);
    },
    [orderBy, order]
  );

  return (
    <>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h1" gutterBottom>
            History
          </Typography>
        </Grid>

        <Grid item xs={12} xl={1.5} lg={1}>
          <TextField
            id="date"
            label="From date"
            type="date"
            defaultValue="2021-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
            aria-errormessage="This field is required"
            aria-required
          />
        </Grid>

        <Grid item xs={12} xl={1.5} lg={2}>
          <TextField
            id="date"
            label="To date"
            type="date"
            defaultValue="2021-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
            required
            aria-required
            aria-errormessage="This field is required"
          />
        </Grid>

        <Grid item xs={12} xl={1.5} lg={2}>
          <Select
            native
            value={value}
            inputProps={{
              name: "type",
              id: "type",
            }}
            fullWidth
            size="small"
            required
            aria-required
            aria-errormessage="This field is required"
          >
            <option value="" disabled>
              Select type of transaction
            </option>
            <option value={1}>Live Price</option>
            <option value={2}>Exchanged</option>
          </Select>
        </Grid>

        <Grid item xs={12} xl={1.5} lg={2}>
          <Button variant="contained">Filter</Button>
        </Grid>
      </Grid>
      <Grid container>
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            aria-labelledby="tableUnits"
            size={dense ? "small" : "medium"}
          >
            <TableUnitsHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.currencyTo}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell>{row.currencyFrom}</TableCell>
                      <TableCell>{row.currencyTo}</TableCell>
                      <TableCell>{row.amount1}</TableCell>
                      <TableCell>{row.amount2}</TableCell>
                      <TableCell>{row.type}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid container mt={4} mb={2}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(rows.length / rowsPerPage)}
              color="primary"
              page={page}
              onChange={handleNavigation}
              shape="rounded"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default TableCurrency;
