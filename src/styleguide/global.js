import { createGlobalStyle } from 'styled-components';
import { PRIMARY_COLOR } from 'app/modules/SinglePage/pages/styles';

export default createGlobalStyle`

  @font-face {
    font-family: 'Oswald Regular';
    src: url('/fonts/Oswald-Regular.ttf');
  }

  @font-face {
    font-family: 'Oswald Medium';
    src: url('/fonts/Oswald-Medium.ttf');
  }

  @font-face {
    font-family: 'SourceSansPro Regular';
    src: url('/fonts/SourceSansPro-Regular.ttf');
  }

  @font-face {
    font-family: 'SourceSansPro Bold';
    src: url('/fonts/SourceSansPro-Bold.ttf');
  }

  @font-face {
    font-family: 'SourceSansPro Light';
    src: url('/fonts/SourceSansPro-Light.ttf');
  }
  
  @font-face {
    font-family: 'SourceSerifPro Regular';
    src: url('/fonts/SourceSerifPro-Regular.ttf');
  }
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
    height: 100%;
  }

  body {
    background: ${PRIMARY_COLOR};
    overflow: visible;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6 {
    letter-spacing: 0.48px;
    color: #333333;
  }

  h1, h2, h3 {
    font-family: 'Oswald Medium';
  }

  h4, h5, h6 {
    font-family: 'Oswald Regular';
  }

  p {
    font-family: 'SourceSerifPro Regular';
    color: #333333;
  }

  li {
    font-family: 'SourceSansPro Regular';
    color: #333333;
  }

  button {
    cursor: pointer;
  }
`;
