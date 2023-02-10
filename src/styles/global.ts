import { createGlobalStyle } from "styled-components";

// create global styles
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    background: #f5f5f5;

  }

  body {
    background: white;
  }
`;
