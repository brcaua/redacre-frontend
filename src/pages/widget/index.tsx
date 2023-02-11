import { Icon } from "@iconify/react";
import {
  Alert,
  Button,
  Container,
  Grid,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { currencyAPI } from "../../api/currencyAPI";
import { CurrencyContext } from "../../hooks/useCurrency";
import TableCurrency from "../components/tableCurrency";

const useStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "0px 8px 16px 0px rgba(17, 17, 17, 0.06)",
    margin: {
      xs: "2rem 0px",
      sm: 0,
    },
    padding: {
      xs: 0,
      sm: 4,
    },
    rowGap: {
      xs: 2,
      sm: 4,
    },
  },
  table: {
    padding: {
      xs: 0,
      sm: 5,
    },
    margin: 0,
  },
};

const WidgetCurrency = () => {
  const [currency, setCurrency] = useState("usd");
  const [crypto, setCrypto] = useState("bitcoin");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [open, setOpen] = React.useState(false);
  const { data } = useQuery("currency", () =>
    fetch(currencyAPI).then((res) => res.json())
  );
  const { currencyList, cryptoList } = React.useContext(CurrencyContext);

  useEffect(() => {
    try {
      if (data) {
        const result: number = data[crypto][currency] * amount;
        setResult(result);
      } else {
        setResult(0);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currency, crypto, amount, data]);

  function handleCloseSnackbar(
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  function handleSave() {
    setOpen(true);
  }

  return (
    <Container maxWidth={false} sx={useStyles.root}>
      <Grid container columnSpacing={2} sx={useStyles.header}>
        <Grid item xs={12} lg={12}>
          <Typography variant="h5" component="span" fontWeight={700}>
            Exchange
          </Typography>
        </Grid>
        <Grid item xs={12} xl={2} lg={2}>
          <label htmlFor="currencyFrom">Currency from</label>
          <Select
            id="currencyFrom"
            fullWidth
            native
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            size="small"
          >
            {cryptoList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} xl={2} lg={2}>
          <label htmlFor="amount">Amount</label>
          <TextField
            id="amount"
            fullWidth
            type="number"
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
            size="small"
            placeholder="Enter the amount"
          />
        </Grid>

        <Grid
          item
          xl={0.5}
          lg={0.5}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <legend>&nbsp;</legend>
          <Typography>
            <Icon icon="mdi:equal" />
          </Typography>
        </Grid>

        <Grid item xs={12} xl={2} lg={2}>
          <label htmlFor="currencyTo">Currency to</label>
          <Select
            id="currencyTo"
            fullWidth
            native
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            size="small"
            sx={{
              backgroundColor: "#f5f5f5",
            }}
          >
            {currencyList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} xl={2} lg={2}>
          <label htmlFor="result">Amount</label>
          <TextField
            id="result"
            fullWidth
            value={result.toLocaleString("en-US", {
              style: "currency",
              currency: currency,
            })}
            disabled
            size="small"
          />
        </Grid>
        <Grid item xs={12} xl={1} lg={1} alignSelf="flex-end">
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{
              borderRadius: 1,
              textTransform: "capitalize",
              padding: 1,
              backgroundColor: "#49CD5E",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <Grid container sx={useStyles.table}>
        <TableCurrency />
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "95vw", margin: "0 10px" }}
        >
          Dados salvos com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default WidgetCurrency;
