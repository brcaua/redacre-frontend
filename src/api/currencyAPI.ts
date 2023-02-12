import axios from "axios";

export const currencyAPI =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin&vs_currencies=usd,eur,gbp,jpy,brl";

export const currencyAPITable = axios.get("http://localhost:3000/currency", {
  headers: {
    "Content-Type": "application/json",
    method: "GET",
    mode: "cors",
    "Access-Control-Allow-Origin": "*",
  },
});
