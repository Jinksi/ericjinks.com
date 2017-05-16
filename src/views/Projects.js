import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import Card from '../components/Card'
import projectsList from '../projects/projectsList'
import { Container, Section } from '../components/common'

const Projects = ({ globalX, globalY }) => (
  <Page>
    <Section thin>
      <Container>
        { projectsList.map(project => (
          <Card
            key={project.title}
            title={project.title}
            to={`/${project.id}`}
            image={project.image}
            globalX={globalX}
            globalY={globalY}
            brightness={project.brightness}
          />
        ))}
      </Container>
    </Section>
    <Helmet
      title='Projects'
    />
  </Page>
)

export default Projects
