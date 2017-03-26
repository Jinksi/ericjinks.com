import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Container, Section } from '../components/common'

export default (props) => (
  <Page>
    <Section thin>
      <Container>
        <p>Some of the projects I have worked or am working on.</p>
        <div>Processing sketches</div>
        <div>Visual Synths</div>
        <div>C Horse </div>
        <div>DS</div>
        <div>Wild Ceramics</div>
        <div>outrun</div>
        <div>Arrival</div>
      </Container>
    </Section>
    <Helmet>
      <title>Things</title>
    </Helmet>
  </Page>
)
