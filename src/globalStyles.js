import { injectGlobal } from 'styled-components'
import WebFont from 'webfontloader'

export const loadFonts = () => WebFont.load({
  google: {
    families: ['PT Mono']
  }
})

export const font = {
  primary: `'PT Mono', sans-serif`
}

export const color = {
  primary: '#89C5C4',
  secondary: '#e3dccd',
  black: '#272121'
}

export default () => injectGlobal`
  html{
    box-sizing: border-box;
    font-size: 62.5%;
    background: ${color.black};
  }

  body {
    font-family: ${font.primary};
    min-height: 100vh;
    position: relative;
    background: ${color.black};
    color: ${color.secondary};
    font-size: 1.8em;
    font-weight: 300;
    letter-spacing: .01em;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }


  a{
    color: ${color.primary};
  }
  ::selection{
    background: ${color.primary};
    opacity: 1;
  }
`
