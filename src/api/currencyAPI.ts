const currencyAPITable = [
  // create a table with 20 rows of random data for the currency API table
  ...Array(20)
    .fill(0)
    .map((_, i) => {
      const date: string = new Date(
        2020,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28)
      ).toLocaleDateString(); // random date between 2020-01-01 and 2020-12-31

      const currencyFrom = ["BTC", "ETH", "XRP", "LTC"][
        Math.floor(Math.random() * 4)
      ];

      const amount1: number | string =
        Math.floor(Math.random() * 1000000) / 100;

      const currencyTo = ["USD", "EUR", "GBP", "JPY", "BRL"][
        Math.floor(Math.random() * 5)
      ];

      const amount2: number | string = Math.floor(
        Math.random() * 1000000
      ).toLocaleString("en-US", {
        style: "currency",
        currency: currencyTo,
      });

      const type = ["Live Price", "Exchanged"][Math.floor(Math.random() * 2)];

      return {
        date,
        currencyFrom,
        amount1,
        currencyTo,
        amount2,
        type,
      };
    }),
];

export default currencyAPITable;
