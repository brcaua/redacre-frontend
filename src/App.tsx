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
            { name: "🇺🇸 USD", value: "usd", money: "$" },
            { name: "🇪🇺 EUR", value: "eur", money: "€" },
            { name: "🇬🇧 GPB", value: "gbp", money: "£" },
            { name: "🇯🇵 JPY", value: "jpy", money: "¥" },
            { name: "🇧🇷 BRL", value: "brl", money: "R$" },
          ],
          cryptoList: [
            { name: "₿ Bitcoin", value: "bitcoin" },
            { name: "🪙 Ethereum", value: "ethereum" },
            { name: "🪙 Ripple", value: "ripple" },
            { name: "🪙 Litecoin", value: "litecoin" },
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
