import { createGlobalStyle } from 'styled-components';
import colors from './colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: none;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 13px 'Roboto', sans-serif;
    color: ${colors.black}
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  #root {
    max-width: 630px;
    margin: 0 auto;
    padding: 20px;
  }
`;
