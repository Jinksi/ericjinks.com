import React, { Component } from 'react'
import _get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Page from '../components/Page'
import MarkdownContent from '../components/MarkdownContent'

import {
  Title,
  Flex,
  Container,
  Section,
  BackgroundImage,
  Button,
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

class Project extends Component {
  constructor(props) {
    super(props)
    this.headerBG = null
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.handleMouseMove)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.handleMouseMove)
    }
  }

  handleMouseMove() {}

  render() {
    const {
      data: { project },
    } = this.props
    const image = _get(project, 'frontmatter.image.childImageSharp.resize.src')

    return (
      <Page>
        <Helmet title={project.frontmatter.title} />
        <Header>
          <BackgroundImage
            className="animate-translate animate-translate-mobile"
            style={{
              transform: `scale(1.1)`,
            }}
            innerRef={el => {
              this.headerBG = el
            }}
            image={image}
          />
          <Container>
            <Flex>
              <Title>
                <div className="background animate-translate animate-translate-mobile" />
                <span>{project.frontmatter.title}</span>
              </Title>
            </Flex>
          </Container>
        </Header>
        <Section>
          <Container>
            {project.external && (
              <p>
                <Button href={project.frontmatter.external}>View</Button>
              </p>
            )}
            {project.html && (
              <div dangerouslySetInnerHTML={{ __html: project.html }} />
            )}
          </Container>
        </Section>
      </Page>
    )
  }
}

export default Project

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        # date(formatString: "MMMM DD, YYYY")
        date
        image {
          childImageSharp {
            resize(width: 1800) {
              src
            }
          }
        }
      }
    }
  }
`
