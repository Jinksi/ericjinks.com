import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Section, Container, Flex, Col, Tip, H1 } from '../components/common'
import Cube from '../components/Cube'

export default (props) => (
  <Page>
    <Section thin>
      <Container>
        <Flex alignCenter>
          <Col>
            <H1>Eric Jinks.</H1>
            <p>
              A developer, creative coder and musician.
            </p>
            <p>
              I really enjoy working with <Tip title='ES6 FTW!'>JavaScript</Tip>, <Tip title='awesome'>React</Tip> and modern front-end workflows.<br />
              I spend too much time getting excited about WebGL, WebVR and WebAudio.
            </p>
            <p>
              Apart from web stuff, I get stoked on creating AV art and the collision between music, creative coding, and visual art.
            </p>
          </Col>
          <Col />
        </Flex>
      </Container>
    </Section>
    <Helmet>
      <title>Home</title>
    </Helmet>
  </Page>
)
