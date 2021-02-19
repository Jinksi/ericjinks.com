import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

import Meta from '../components/Meta'
import AnimatedTitle from './AnimatedTitle'
import { Flex, Container, Section, TextContainer } from '../components/common'

const Header = styled(Section)`
  overflow: hidden;
  position: relative;
  min-height: 25rem;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`

export default ({ location, image, title, date, author }) => {
  return (
    <Header image={!!image}>
      <Container>
        {image && (
          <TextContainer auto>
            <GatsbyImage {...image} />
          </TextContainer>
        )}
        <Flex column alignCenter>
          <AnimatedTitle inverted>{title}</AnimatedTitle>
          <Meta date={date} author={author} location={location} />
        </Flex>
      </Container>
    </Header>
  )
}
