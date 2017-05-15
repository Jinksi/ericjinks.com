import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Section, Container, Flex, Col, H1 } from '../components/common'

export default (props) => (
  <Page>
    <Section thin>
      <Container>
        <Flex alignCenter>
          <Col>
            <H1>Hi I'm Eric.</H1>
            <p>
              Creative developer, sound designer / musician.
            </p>
            <p>
              I mess with JavaScript, WebGL, WebVR, WebAudio to create audio and visual art / things.
            </p>
          </Col>
          <Col></Col>
        </Flex>
      </Container>
    </Section>
    <Helmet>
      <title>About</title>
    </Helmet>
  </Page>
)
