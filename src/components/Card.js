import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Relative, Flex, BackgroundImage } from './common'
import { color } from '../globalStyles'

const transition = `
  transition: all .1s ease-in-out;
`

const Card = styled(Link)`
  position: relative;
  display: block;
  mix-blend-mode: lighten;
  text-decoration: none;

  .CardBackgroundImage {
    filter: saturate(30%);
    ${transition};
  }

  &:hover,
  &:focus {
    text-decoration: none;

    .CardBackgroundImage {
      filter: saturate(100%);
    }

    .CardInner {
      opacity: 1;
    }
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

const Title = styled(Relative)`
  background: ${color.secondary};
  font-size: 3rem;
  color: ${color.black};
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0rem 1rem;
  line-height: 1;
`

export default ({title, image}) => (
  <Card to='/'>
    <BackgroundImage className='CardBackgroundImage' image={image} />
    <CardInner className='CardInner' alignCenter justifyStart>
      <Title className='CardTitle'>
        {title}
      </Title>
    </CardInner>
  </Card>
)
