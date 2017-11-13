import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import Page from '../components/Page'
import { Title, Section, Container, Flex, Col } from '../components/common'

export default props => (
  <Page>
    <Section thin>
      <Container skinny>
        <Flex alignCenter>
          <Col>
            <Title>
              <div className='background animate-translate animate-translate-mobile' />
              <span>Eric Jinks</span>
            </Title>
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
              <Link to='/contact'>Contact</Link> page or send me an email at{' '}
              <a target='_blank' href='mailto:ericjinks@gmail.com'>
                ericjinks@gmail.com
              </a>
            </p>
            <h3>Interests</h3>
            - JavaScript - React - Node - GraphQL - REST - HTML - CSS -
            Serverless architecture - Progressive Web Apps - Headless CMS -
            Service Workers - WebVR - WebAudio
          </Col>
        </Flex>
      </Container>
    </Section>
    <Helmet title='About' />
  </Page>
)
