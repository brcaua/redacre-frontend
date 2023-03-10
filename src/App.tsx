import React from "react";
import { CurrencyContext } from "./hooks/useCurrency";
import WidgetCurrency from "./pages/widget/index";
import { GlobalStyle } from "./styles/global";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CurrencyContext.Provider
        value={{
          currencyList: [
            { name: "πΊπΈ USD", value: "usd", money: "$" },
            { name: "πͺπΊ EUR", value: "eur", money: "β¬" },
            { name: "π¬π§ GPB", value: "gbp", money: "Β£" },
            { name: "π―π΅ JPY", value: "jpy", money: "Β₯" },
            { name: "π§π· BRL", value: "brl", money: "R$" },
          ],
          cryptoList: [
            { name: "βΏ Bitcoin", value: "bitcoin" },
            { name: "πͺ Ethereum", value: "ethereum" },
            { name: "πͺ Ripple", value: "ripple" },
            { name: "πͺ Litecoin", value: "litecoin" },
          ],
        }}
      >
        <GlobalStyle />
        <WidgetCurrency />
      </CurrencyContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
