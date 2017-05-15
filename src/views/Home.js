import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Title, Section, Container, Flex, Col, H1 } from '../components/common'

export default (props) => (
  <Page>
    <Section thin>
      <Container>
        <Flex alignCenter>
          <Col>
            <Title>Eric Jinks</Title>
            <p>
              Creative developer, sound designer / musician.
            </p>
            <p>
              I mess with JavaScript, WebGL, WebVR, WebAudio to create audio and visual art / things.
            </p>
          </Col>
        </Flex>
      </Container>
    </Section>
    <Helmet>
      <title>About</title>
    </Helmet>
  </Page>
)
