import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

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
              <p>
                I am a software engineer / web developer from the Gold Coast,
                Australia.
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
              <li>Machine Learning</li>
              <li>Serverless Architecture</li>
              <li>WebVR, WebAudio &amp; WebGL</li>
              <li>Creative Coding</li>
              <li>Music &amp; Sound Design</li>
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
