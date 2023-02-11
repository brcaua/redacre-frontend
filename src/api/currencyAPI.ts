export const currencyTableData = [
  ...Array(20)
    .fill(0)
    .map((_) => {
      const date = new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toLocaleString();

      const currencyFrom = ["BTC", "ETH", "XRP", "LTC"][
        Math.floor(Math.random() * 4)
      ];

      const amount1 = Math.floor(Math.random() * 100).toString();

      const currencyTo = ["USD", "EUR", "GBP", "JPY", "BRL"][
        Math.floor(Math.random() * 5)
      ];

      const amount2 = Math.floor(Math.floor(Math.random() * 1000000) / 100)
        .toLocaleString("en-US", {
          style: "currency",
          currency: currencyTo,
        })
        .toString();

      // live price or exchanged  because I will need filter by this
      const type = ["Live Price", "Exchanged"][Math.floor(Math.random() * 2)];

      return {
        date,
        currencyFrom,
        currencyTo,
        amount1,
        amount2,
        type,
      };
    }),
];

export const currencyAPI =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin&vs_currencies=usd,eur,gbp,jpy,brl";
