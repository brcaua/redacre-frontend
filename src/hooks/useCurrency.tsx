// create a useContext to store the currency list and the crypto list

import React from "react";

export const CurrencyContext = React.createContext({
  currencyList: [
    { name: "$ USD", value: "usd", money: "$" },
    { name: "€ EUR", value: "eur", money: "€" },
    { name: "£ GPB", value: "gbp", money: "£" },
    { name: "¥ JPY", value: "jpy", money: "¥" },
    { name: "R$ BRL", value: "brl", money: "R$" },
  ],
  cryptoList: [
    { name: "Bitcoin", value: "bitcoin" },
    { name: "Ethereum", value: "ethereum" },
    { name: "Ripple", value: "ripple" },
    { name: "Litecoin", value: "litecoin" },
  ],
});
