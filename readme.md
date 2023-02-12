# Widget currency

This is a widget to display the rates from cryptocurrencies to currencies.

## Autor

* **Breno Pereira**

## Tecnologies used (frontend):

* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Material UI](https://material-ui.com/)
* [React Query](https://react-query.tanstack.com/)
* Axios
* [Iconify](https://iconify.design/)


## How to use
**Obs:** You need to have [Node.js](https://nodejs.org/en/) installed on your machine.


1. Clone this repository using
2. Install the dependencies using `yarn` or `npm install`
3. So, run `yarn start` or `npm run start` to start the application in development mode.
4. Enjoy! :D

## Application role

**Widget roles**
This application is a widget that displays the rates of the currencies and cryptocurrencies mentioned above.

For this, it uses the [Coin Gecko API](https://api.coingecko.com/api/v3/) via React Query to get the rates and display them very quickly.

* [x] The currencies allowed are: **🇺🇸 USD, 🇬🇧 GBP,🇪🇺 EUR, 🇯🇵 JPY, 🇧🇷 BRL**

* [x] The cryptocurrencies allowed are: **🪙 BTC, 🪙 LTC, 🪙 RPL, 🪙 ETH**

A example of use is:
1. In the moment of writing this, the rate of 1 BTC to USD is 21.500,00
  1. So, if you want to know how much is 1 BTC to USD, you just need to select the cryptocurrency and the currency with the values that you want to convert. So, quickly, you will see the result.

**Table roles**
This application is a table that displays the rates of the currencies and cryptocurrencies mentioned above.

* The data
 There rates are created by the backend service in Nest.js that stores the rates in a MongoDB database.

  For this case, we use the port `3000/currency` to access the backend service and get all the historical rates.

* Filter
  It's possible to filter the rates by Live Price type for now. The types are: `Live Price` and `Exchanged`.

* Sort
  It's possible to sort the rates by the column selected.

* Pagination
  It's possible to paginate the rates conforming the page size, the page number and filter selected.

**Styling**

The styling was made using Material UI and CSS.

The desktop version is responsive and the mobile version is not responsive completely.

To set the colours I followed the Figma design mentioned in the challenge.

## Demo
https://user-images.githubusercontent.com/46445777/218340586-21fc26c2-0e7f-4178-9771-0f1b8436e44f.mov
