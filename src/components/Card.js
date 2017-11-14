import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Title, Flex, BackgroundImage } from './common'
import { color } from '../globalStyles'

export default ({ to, title, image, brightness }) => (
  <CardWrap to={to}>
    <BackgroundImage
      className='CardBackgroundImage'
      image={image}
      opacity={brightness}
    />
    <CardInner className='CardInner' alignCenter justifyStart>
      <Title className='CardTitle'>
        <div className='background' />
        <span className='animate-translate'>{title}</span>
      </Title>
    </CardInner>
  </CardWrap>
)

const transition = `
  transition: all .1s ease-out;
`
const CardWrap = styled(Link)`
  position: relative;
  display: block;
  mix-blend-mode: lighten;
  text-decoration: none;
  overflow: hidden;

  .CardBackgroundImage {
    filter: saturate(30%);
    transition: filter 0.1s ease-out;
  }

  &:hover,
  &:focus {
    text-decoration: none;
  }
`
const CardInner = styled(Flex)`
  position: relative;
  background: ${color.black};
  height: 30rem;
  max-height: 80vh;
  opacity: 0.9;
  mix-blend-mode: lighten;
  ${transition};
`
