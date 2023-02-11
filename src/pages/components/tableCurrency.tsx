import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Button,
  Grid,
  Pagination,
  PaginationItem,
  Paper,
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
import { currencyTableData } from "../../api/currencyAPI";
import { TableCurrencyProps } from "../../interfaces/WidgetProps";
import TableUnitsHead from "./headTableCurrency";

interface TabelCurrencyProps {
  date: string;
  currencyFrom: string;
  currencyTo: string;
  amount1: string;
  amount2: string;
  type: string;
}

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

// This function returns a comparator function that is used to sort the data
// based on the sort order and the column name.
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

// This function sorts the array by comparing the first element of each array.
// If the order is 0, it will return the second element of the array.

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
    return currencyTableData;
  }, []); // Memoize the data so we don't have to re-render the component if the data doesn't change.

  const [value, setValue] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(8);
  const [rows, setRows] = React.useState<TabelCurrencyProps[]>(
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

  // TODO: filter by date, type "Exchanged"
  const handleFilter = () => {
    const filterByTypeOrDate = memoizedmockTableDataRows.filter(
      (item) => item.type === "Live Price"
    );

    setRows(filterByTypeOrDate);
  };

  return (
    <>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h1" gutterBottom fontWeight={700}>
            History
          </Typography>
        </Grid>

        <Grid item xs={12} xl={1.5} lg={1}>
          <label htmlFor="fromDate">From date</label>
          <TextField
            id="fromDate"
            aria-label="From date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} xl={1.5} lg={2}>
          <label htmlFor="toDate">To date</label>
          <TextField
            id="toDate"
            aria-label="To date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
            required
          />
        </Grid>

        <Grid item xs={12} xl={1.5} lg={2}>
          <label htmlFor="type">Type</label>
          <Select
            native
            value={value}
            inputProps={{
              name: "type",
              id: "type",
            }}
            fullWidth
            size="small"
            id="type"
            onChange={(e: any) => setValue(e.target.value)}
          >
            <option value="all">All</option>
            <option value="livePrice">Live Price</option>
            <option value="exchanged">Exchanged</option>
          </Select>
        </Grid>

        <Grid item xs={12} xl={1.5} lg={2}>
          <legend>&nbsp;</legend>
          <Button
            variant="outlined"
            sx={{ borderColor: "#1B31A8", color: "#1B31A8" }}
            onClick={handleFilter}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <TableContainer component={Paper}>
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
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell>{row.currencyFrom}</TableCell>
                      <TableCell>{row.currencyTo}</TableCell>
                      <TableCell>{row.amount1}</TableCell>
                      <TableCell>{row.amount2}</TableCell>
                      <TableCell>
                        {/* if the type is live price the color is red */}
                        {row.type === "Live Price" ? (
                          <span style={{ color: "#5DBE7E", fontWeight: "700" }}>
                            {row.type}
                          </span>
                        ) : (
                          <span style={{ color: "#6368DF", fontWeight: "700" }}>
                            {row.type}
                          </span>
                        )}
                      </TableCell>
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
              // change arrow to "Next"
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
              // when is selected change the background color to black with color white
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#000000",
                  color: "#fff",
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default TableCurrency;
