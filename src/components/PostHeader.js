import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

import Meta from '../components/Meta'
import {
  Title,
  Flex,
  Container,
  Section,
  TextContainer,
} from '../components/common'

export default ({ location, image, title, date, author }) => {
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

  return (
    <Header image={!!image}>
      <Container>
        {image && (
          <TextContainer auto>
            <GatsbyImage {...image} />
          </TextContainer>
        )}
        <Flex column alignCenter>
          <Title white>
            <div className="background animate-translate animate-translate-mobile" />
            <span>{title}</span>
          </Title>
          <Meta date={date} author={author} location={location} />
        </Flex>
      </Container>
    </Header>
  )
}
