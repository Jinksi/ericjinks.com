import styled, { css } from 'styled-components'
import { color } from '../globalStyles'

export const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Relative = styled.div`
  position: relative;
  z-index: 0;
`

export const PageWrap = styled.div`
  padding: 3rem 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 450px) {
    padding: 10vh 0;
  }

  ${props =>
    props.whiteTheme
      ? css`
          color: ${color.black};
          background: white;
        `
      : css`
          .ContentContainer {
            picture {
              mix-blend-mode: lighten;
            }
          }
        `};
`

export const Section = styled.section`
  width: 100%;
  padding: ${props => {
    if (props.thick) return '10rem 0'
    if (props.thin) return '2.5rem 0'
    return '5rem 0'
  }};
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1111px;
  width: 90vw;
`

export const TextContainer = styled.div`
  max-width: 700px;
  width: 100%;
  ${props =>
    props.auto &&
    css`
      margin-left: auto;
      margin-right: auto;
    `};
  & > pre[class*='language-'] {
    background: ${color.code};
    margin-top: 4rem;
    margin-bottom: 4rem;

    @media (min-width: 800px) {
      margin-left: -7vw;
      margin-right: -7vw;
    }
  }
`

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  justify-content: ${props => {
    if (props.justifyCenter) return 'center'
    if (props.justifyEnd) return 'flex-end'
    if (props.justifyBetween) return 'space-between'
    if (props.justifyAround) return 'space-around'
    return 'flex-start'
  }};
  align-items: ${props => {
    if (props.alignStart) return 'flex-start'
    if (props.alignEnd) return 'flex-end'
    if (props.alignStretch) return 'stretch'
    return 'center'
  }};
  height: ${props => (props.fill ? '100%' : 'auto')};
  width: ${props => (props.fill ? '100%' : 'auto')};
  flex-wrap: ${props => (props.flexWrap ? 'wrap' : 'wrap')};
`

export const Col = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex: 1 1 auto;
`

export const BackgroundImage = styled(Absolute)`
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
  opacity: ${props => props.opacity || 1};
  transition: opacity 0.5s ease;

  .gatsby-image-wrapper {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

export const Tip = styled.span`
  border-bottom: 1px dotted currentColor;
`

export const H1 = styled.h1`
  font-weight: 200;
  color: ${color.primary};
`

export const Title = styled.h1`
  position: relative;
  font-size: 3rem;
  color: ${props => (props.white ? '#ffffff' : color.black)};
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0rem 1rem;
  line-height: 1;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => (props.white ? color.black : color.secondary)};
  }

  span {
    position: relative;
  }
`

export const Button = styled.a`
  background: ${color.secondary};
  color: ${color.black};
  mix-blend-mode: ${props => (props.dark ? 'normal' : 'lighten')};
  padding: 0rem 1rem;
  text-transform: uppercase;
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${color.black};
    opacity: 0.9;
  }
`

export const OutlinedButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin: 1rem auto;
  border: 1px solid ${color.black};
  background: white;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover,
  &:focus {
    background: ${color.black};
    color: white;
  }s
`
export const FancyButton = styled(Button)`
  display: block;
  width: 100%;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  border: 1px solid ${color.black};
  background: white;
  cursor: pointer;
  text-align: center;
  margin-bottom: 3rem;
`
