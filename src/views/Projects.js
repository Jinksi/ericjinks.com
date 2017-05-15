import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import Card from '../components/Card'
import projects from '../projects/projects'
import { Container, Section } from '../components/common'

export default (props) => (
  <Page>
    <Section thin>
      <Container>
        <p>Some of the projects I have worked or am working on.</p>
        { projects.map(project => (
          <Card
            key={project.title}
            title={project.title}
            image={project.image}
          />
        ))}
        <div>Processing sketches</div>
        <div>Visual Synths</div>
        <div>C Horse </div>
        <div>DS</div>
        <div>Wild Ceramics</div>
        <div>Arrival</div>
      </Container>
    </Section>
    <Helmet>
      <title>Projects</title>
    </Helmet>
  </Page>
)
