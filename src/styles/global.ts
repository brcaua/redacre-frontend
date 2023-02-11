import { createGlobalStyle } from "styled-components";

// create global styles
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
    padding: 0;
    margin: 0;
    font-family: "Red Hat Display", sans-serif;
  }

  html {

    background: #f5f5f5;
    color: "black";
  }

  body {
    background: white;
  }
`;
