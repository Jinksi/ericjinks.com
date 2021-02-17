import React from 'react'
import styled, { css } from 'styled-components'
import cn from 'classnames'
import { useTheme } from '../hooks'

export const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Fixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`

export const Relative = styled.div`
  position: relative;
  z-index: 0;
`

const PageWrapStyled = styled.div`
  padding: 3rem 0 0 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props =>
    props.transparent ? `transparent` : `var(--color-background)`};

  @media (min-width: 450px) {
    padding: 10vh 0 0 0;
  }
`

export const PageWrap = ({ transparent, ...props }) => {
  const { isDarkTheme } = useTheme()
  return <PageWrapStyled {...props} transparent={transparent || isDarkTheme} />
}

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
    background: var(--color-code);
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
  color: var(--color-text);
`

export const TitleStyled = styled.h1`
  position: relative;
  font-size: 3rem;
  color: ${props =>
    props.inverted ? `var(--color-background)` : `var(--color-text)`};
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0rem 1rem;
  line-height: 1;

  .Title--bg1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props =>
      props.inverted ? `var(--color-text)` : `var(--color-background)`};
  }

  span {
    position: relative;
  }
`

export const Title = ({
  animateTranslate = true,
  animateTranslateMobile = true,
  children,
  className = '',
  ...props
}) => {
  const bgClassnames = {
    'animate-translate': animateTranslate,
    'animate-translate-mobile': animateTranslateMobile,
  }
  return (
    <TitleStyled className={className} {...props}>
      <div className={cn('Title--bg1', bgClassnames)} />
      <span>{children}</span>
    </TitleStyled>
  )
}

export const Button = styled.a`
  background: var(--color-text);
  color: var(--color-background);
  padding: 0rem 1rem;
  text-transform: uppercase;
  text-decoration: none;

  &:hover,
  &:focus {
    color: var(--color-background);
    opacity: 0.9;
  }
`

export const OutlinedButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin: 1rem auto;
  border: 1px solid currentColor;
  background: var(--color-background);
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover,
  &:focus {
    background: var(--color-text);
    color: var(--color-background);
  }
`

export const FancyButton = styled(Button)`
  display: block;
  width: 100%;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  border: 1px solid var(--color-text);
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  text-align: center;
  margin-bottom: 3rem;

  &:hover,
  &:focus {
    background: var(--color-text);
    color: var(--color-background);
  }
`
