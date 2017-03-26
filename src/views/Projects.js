import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Container, Section } from '../components/common'

export default (props) => (
  <Page>
    <Section thin>
      <Container>
        <h1>Projects</h1>
        <p>A sem vel nec sodales mi vivamus senectus sed potenti a parturient nascetur tincidunt nisi pulvinar rhoncus a. Risus imperdiet taciti suspendisse facilisi a per metus cubilia varius a nostra adipiscing amet ultrices quisque ac mi a. Dictumst a ultrices mi a dignissim ad fermentum eget a nam et a blandit scelerisque. Taciti lorem tempor quam vestibulum dis habitasse vestibulum diam vel est ut proin dis auctor. Suscipit scelerisque orci magna interdum vel bibendum duis netus a consectetur dui magnis ac aliquet sem posuere tincidunt vestibulum.</p>
      </Container>
    </Section>
    <Helmet>
      <title>Projects</title>
    </Helmet>
  </Page>
)
