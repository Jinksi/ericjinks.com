import React from 'react'
import styled from 'styled-components'

import Meta from '../components/Meta'
import {
  Title,
  Flex,
  Container,
  Section,
  BackgroundImage,
  TextContainer,
} from '../components/common'

export default ({ image, title, date }) => {
  const Header = styled(Section)`
    overflow: hidden;
    position: relative;
    height: ${props => (props.image ? '35vw' : 'auto')};
    min-height: 25rem;
    max-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `

  return (
    <Header image={!!image}>
      {image && (
        <BackgroundImage
          className="animate-translate animate-translate-mobile"
          style={{
            transform: `scale(1.1)`,
          }}
          innerRef={el => {
            this.headerBG = el
          }}
          image={image}
        />
      )}
      <Container>
        <Flex column alignCenter>
          <Title white>
            <div className="background animate-translate animate-translate-mobile" />
            <span>{title}</span>
          </Title>
          <Meta date={date} />
        </Flex>
      </Container>
    </Header>
  )
}
