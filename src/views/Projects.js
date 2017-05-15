import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import Card from '../components/Card'
import projects from '../projects/projects'
import { Container, Section } from '../components/common'

const Projects = ({ globalX, globalY }) => (
  <Page>
    <Section thin>
      <Container>
        <p>Some of the projects I have worked or am working on.</p>
        { projects.map(project => (
          <Card
            key={project.title}
            title={project.title}
            to={`/projects/${project.id}`}
            image={project.image}
            globalX={globalX}
            globalY={globalY}
          />
        ))}
      </Container>
    </Section>
    <Helmet>
      <title>Projects</title>
    </Helmet>
  </Page>
)

export default Projects
