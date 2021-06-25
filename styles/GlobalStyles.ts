import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import typography from './typography';
import { colors } from './config';

export default createGlobalStyle`
  ${normalize} // RESET CSS

  ${typography}

  html * {
    box-sizing: border-box;
    margin: 0;
  }

  html,
  body {
    min-width: 360px;
    min-height: 100vh;
  }

  :root {
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: ${colors.black2};
    background-color: ${colors.white};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    font-size: 28px;
    color: ${colors.black2};
  }

  a { text-decoration: none; }
  
  a,
  button { -webkit-tap-highlight-color: hsla(0, 0%, 0%, 0); }

  ul,
  ol {
    list-style: none;
    padding: 0;  
  }
`;