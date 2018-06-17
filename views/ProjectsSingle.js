import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Page from '../components/Page'
import MarkdownContent from '../components/MarkdownContent'
import projectsList from '../projects/projectsList'
import NoMatch from '../views/NoMatch'

import {
  Title,
  Flex,
  Container,
  Section,
  BackgroundImage,
  Button
} from '../components/common'

const Header = styled(Section)`
  overflow: hidden;
  position: relative;
  mix-blend-mode: lighten;
  height: 35vw;
  min-height: 25rem;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

class Projects extends Component {
  constructor (props) {
    super(props)
    this.headerBG = null
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidMount () {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove () {}

  render () {
    const match = this.props.match
    const project = projectsList.find(x => x.id === match.params.id)
    if (!project) return <NoMatch />
    return (
      <Page>
        <Header>
          <BackgroundImage
            className='animate-translate animate-translate-mobile'
            style={{
              transform: `scale(1.1)`
            }}
            innerRef={el => {
              this.headerBG = el
            }}
            image={project.image}
          />
          <Container>
            <Flex>
              <Title>
                <div className='background animate-translate animate-translate-mobile' />
                <span>{project.title}</span>
              </Title>
            </Flex>
          </Container>
        </Header>
        <Section>
          <Container>
            {project.external && (
              <p>
                <Button href={project.external}>View</Button>
              </p>
            )}
            <MarkdownContent source={project.content} />
          </Container>
        </Section>
        <Helmet title={project.title} />
      </Page>
    )
  }
}

export default Projects
