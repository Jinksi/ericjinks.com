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
  padding: 10vh 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  max-width: 600px;
  width: 100%;
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
  color: ${color.black};
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
    background-color: ${color.secondary};
  }

  span {
    position: relative;
  }
`

export const Button = styled.a`
  background: ${color.secondary};
  color: ${color.black};
  mix-blend-mode: lighten;
  padding: 0rem 1rem;
  text-transform: uppercase;
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${color.black};
    opacity: 0.9;
  }
`
