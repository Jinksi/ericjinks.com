import { createGlobalStyle } from 'styled-components'
import 'modern-normalize/modern-normalize.css'

export const font = {
  primary: `'PT Mono', sans-serif`,
  system: `-apple-system, BlinkMacSystemFont,
   "Segoe UI", "Roboto", "Oxygen",
   "Ubuntu", "Cantarell", "Fira Sans",
   "Droid Sans", "Helvetica Neue", sans-serif`,
}

export const color = {
  primary: 'hsl(40, 28%, 100%)',
  secondary: 'hsl(40, 28%, 95%)',
  black: '#272121',
  highlight: 'hsl(350, 70%, 40%)',
  code: '#282c34',
}

export default createGlobalStyle`
  :root {
    --green: #50E597;
    --white: hsl(40, 28%, 100%);
    --black: #181818;
    --blackTransparent: rgba(24, 24, 24, 0.8);
    --lightGrey: whitesmoke;
    --lightBlack: #282c34;
    /* default to light theme */
    --color-text: var(--black);
    --color-lightGrey: var(--lightGrey);
    --color-background: var(--white);
    --color-highlight: var(--green);
    --color-code: var(--lightBlack);
  }
  

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    background: black;
  }

  body {
    font-family: ${font.system};
    min-height: 100vh;
    position: relative;
    color: var(--color-text);
    font-size: 1.8em;
    font-weight: 300;
    letter-spacing: .01em;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  body[data-theme='dark'] {
    --color-text: var(--white);
    --color-lightGrey: var(--lightBlack);
    --color-background: var(--black);
}
  body[data-theme='light'] {
    --color-text: var(--black);
    --color-background: var(--white);
}

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  strong {
    font-weight: 600;
  }

  a{
    color: inherit;

    &:hover, &:focus{
      color: inherit;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  figcaption {
    background: whitesmoke;
    display: block;
    text-align: center;
    font-size: 0.8em;
    padding: 0.5em;
    margin-bottom: 4rem;
  }

  h1, h2, h3, h4, h5 ,h6{
    margin: 0;
    margin-bottom: 1em;
    margin-top: 1em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      mix-blend-mode: lighten;
    }
  }

  code {
    background: var(--color-lightGrey);
    padding: 0.2em 0.4em;
    font-size: 85% !important;
    overflow: auto;
    max-width: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  pre {
    background: var(--color-code);
    padding: 1rem;
    word-wrap: normal;
    overflow: auto;
    box-shadow: 0 2px 3px rgba(0,0,0,0.3);
    border-radius: 2px;

    code {
      background: none;
      color: #ABB2BF;
      padding: 2rem;
    }

  }

  blockquote {
    background: var(--color-lightGrey);
    padding: 2rem;
    width: 100%;
    border-radius: 2px;
    margin: 3rem auto;
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);

    > *:last-child {
      margin-bottom: 0;
    }
  }

  .animate-translate {
    display: block;
  }

`
