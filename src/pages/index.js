import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import Page from '../components/Page'
import {
  Title,
  Section,
  Container,
  TextContainer,
  Flex,
  Col,
} from '../components/common'

export default props => (
  <Page>
    <Section thin>
      <Container skinny>
        <Flex alignCenter>
          <Col>
            <Title>
              <div className="background animate-translate animate-translate-mobile" />
              <span>Eric Jinks</span>
            </Title>
            <TextContainer>
              <p>I am a web developer from the Gold Coast, Australia.</p>
              <p>
                My professional focus is on creating modern, performant websites
                &amp; apps using JavaScript and Serverless architecture.
              </p>
              <p>
                You'll also find me experimenting with sound design, music,
                JavaScript, WebGL, WebVR and WebAudio.
              </p>
              <p>
                If you'd like to get in touch, head over to the{' '}
                <Link to="/contact/">Contact</Link> page or send me an email at{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:ericjinks@gmail.com"
                >
                  ericjinks@gmail.com
                </a>
              </p>
            </TextContainer>
            <h3>Interests &amp; Skills</h3>
            <List>
              <li>JavaScript</li>
              <li>React</li>
              <li>Node</li>
              <li>GraphQL</li>
              <li>HTML &amp; CSS</li>
              <li>CSS-in-JS</li>
              <li>Serverless</li>
              <li>Progressive Web Apps</li>
              <li>JAMstack</li>
              <li>Headless CMS</li>
              <li>Service Workers</li>
              <li>WebVR, WebAudio &amp; WebGL</li>
            </List>
          </Col>
        </Flex>
      </Container>
    </Section>
    <Helmet title="About" />
  </Page>
)

const List = styled.ul`
  margin: 0;
  padding: 0;
  columns: 2;
  list-style: none;

  @media (min-width: 500px) {
    columns: 3;
  }
`
