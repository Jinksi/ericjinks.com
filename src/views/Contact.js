import React from 'react'
import Helmet from 'react-helmet'

import Page from '../components/Page'
import { Section, Container, TextContainer } from '../components/common'
import NetlifyControlledForm from '../components/NetlifyControlledForm'

export default props => (
  <Page>
    <Section thin>
      <Container skinny>
        <TextContainer>
          <p>
            If you would like to collaborate on a new project or just want to
            get in touch, use the form below.
          </p>
          <p>
            Alternatively, send me an email at{' '}
            <a target='_blank' href='mailto:ericjinks@gmail.com'>
              ericjinks@gmail.com
            </a>.
            <br />
            You can also find me on{' '}
            <a href='https://github.com/Jinksi'>Github</a> or{' '}
            <a href='https://twitter.com/jinksi'>Twitter</a>.
          </p>
          <NetlifyControlledForm siteTitle='ericjinks.com' />
        </TextContainer>
      </Container>
    </Section>
    <Helmet title='Contact' />
  </Page>
)
