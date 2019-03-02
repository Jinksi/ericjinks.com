import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Page from '../components/Page'
import SocialMeta from '../components/SocialMeta'
import {
  Title,
  Section,
  Container,
  TextContainer,
  Flex,
  Col,
} from '../components/common'

export default ({ location }) => (
  <Layout location={location}>
    <Page>
      <SocialMeta title={'About'} />
      <Section thin>
        <Container skinny>
          <Flex alignCenter>
            <Col>
              <Title>
                <div className="background animate-translate animate-translate-mobile" />
                <span>Eric Jinks</span>
              </Title>
              <TextContainer>
                <p>I am a software engineer from the Gold Coast, Australia.</p>
                <p>
                  If you'd like to get in touch, send me an email at{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:ericjinks@gmail.com"
                  >
                    ericjinks@gmail.com
                  </a>{' '}
                  or find me on <a href="https://github.com/Jinksi">Github</a>{' '}
                  or <a href="https://twitter.com/jinksi">Twitter</a>
                </p>
              </TextContainer>
              <h3>Interests &amp; Skills</h3>
              <List>
                <li>WebDev</li>
                <li>WebVR, WebAudio &amp; WebGL</li>
                <li>Creative Coding</li>
                <li>Machine Learning</li>
                <li>Music &amp; Sound Design</li>
              </List>
            </Col>
          </Flex>
        </Container>
      </Section>
    </Page>
  </Layout>
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
