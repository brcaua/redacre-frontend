import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";

import { TableCell, TableRow } from "@mui/material";
import {
  HeadCell,
  TableCurrencyProps,
  TableSortProps,
} from "../../interfaces/WidgetProps";

function TableUnitsHead(props: TableSortProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TableCurrencyProps) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const headCells: readonly HeadCell[] = [
    { id: "date", numeric: false, disablePadding: false, label: "Date" },
    {
      id: "currencyFrom",
      numeric: false,
      disablePadding: false,
      label: "Currency From",
    },
    {
      id: "currencyTo",
      numeric: false,
      disablePadding: false,
      label: "Currency To",
    },
    { id: "amount1", numeric: true, disablePadding: false, label: "Amount 1" },
    { id: "amount2", numeric: true, disablePadding: false, label: "Amount 2" },
    { id: "type", numeric: false, disablePadding: false, label: "Type" },
  ];

  return (
    <>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                )}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}

export default TableUnitsHead;
