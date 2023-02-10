import {
  Alert,
  Button,
  Container,
  createTheme,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { CurrencyContext } from "../../hooks/useCurrency";
import TableCurrency from "../components/tableCurrency";

const currencyAPI =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin&vs_currencies=usd,eur,gbp,jpy,brl";

const WidgetCurrency = () => {
  const [currency, setCurrency] = useState("usd");
  const [crypto, setCrypto] = useState("bitcoin");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [open, setOpen] = React.useState(false);

  const { currencyList, cryptoList } = React.useContext(CurrencyContext);

  const getCurrency = async () => {
    const response = await fetch(currencyAPI);
    const data = await response.json();
    setResult(data[crypto][currency] * amount);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(currencyAPI);

      const data = await response.json();
      setResult(data[crypto][currency] * amount);
    };
    fetchData();
  }, [currency, crypto, amount]);

  function handleClose(_event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  function handleSave() {
    setOpen(true);
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 4,
        }}
      >
        <Grid item xs={12} lg={12}>
          <Typography variant="h6" component="span">
            Exchange
          </Typography>
        </Grid>
        <Grid item xs={12} xl={2.5} lg={3}>
          <InputLabel id="currency">Currency from</InputLabel>
          <Select
            fullWidth
            native
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            size="small"
          >
            {currencyList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} xl={2.5} lg={3}>
          <InputLabel id="amount">Amount</InputLabel>
          <TextField
            fullWidth
            type="number"
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
            size="small"
          />
        </Grid>

        <Grid
          item
          xl={0.5}
          lg={1}
          display={{
            xs: "none",
            sm: "block",
            md: "block",
            lg: "block",
            xl: "block",
          }}
        >
          <legend>&nbsp;</legend>
          <Typography>
            <Icon icon="mdi:equal" />
          </Typography>
        </Grid>

        <Grid item xs={12} xl={2.5} lg={2}>
          <InputLabel id="crypto">Currency to</InputLabel>
          <Select
            fullWidth
            native
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            size="small"
          >
            {cryptoList.map((item) => (
              <option key={item.value} value={item.value}>
                <IconButton size="small">
                  <Icon icon="mdi:bitcoin" />
                  {item.name}
                </IconButton>
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} xl={2.5} lg={2}>
          <InputLabel id="amount">Amount</InputLabel>

          <TextField
            fullWidth
            value={result.toLocaleString("en-US", {
              style: "currency",
              currency: currency,
            })}
            disabled
            size="small"
          />
        </Grid>
        <Grid item xs={12} xl={1.5} lg={2} alignSelf="flex-end">
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{
              borderRadius: 1,
              textTransform: "capitalize",
              padding: 1,
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <TableCurrency />
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
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
