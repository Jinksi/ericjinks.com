import React from 'react'
import _get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Page from '../components/Page'

import { Title, Flex, Container, Section, Button } from '../components/common'
import BackgroundImage from '../components/BackgroundImage'
import SocialMeta from '../components/SocialMeta'

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

const Project = ({ location, data: { project } }) => {
  const image = _get(project, 'frontmatter.image.childImageSharp')

  return (
    <Layout location={location}>
      <SocialMeta
        title={project.frontmatter.title}
        pathname={location.pathname}
      />
      <Page>
        <Header>
          <BackgroundImage
            className="animate-translate animate-translate-mobile"
            style={{
              transform: `scale(1.1)`,
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
            {project.frontmatter.external && (
              <p>
                <Button href={project.frontmatter.external}>View</Button>
              </p>
            )}
            {project.html && (
              <div
                className="ContentContainer"
                dangerouslySetInnerHTML={{ __html: project.html }}
              />
            )}
          </Container>
        </Section>
      </Page>
    </Layout>
  )
}

export default Project

export const pageQuery = graphql`
  query($slug: String!) {
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
        date
        external
        image {
          childImageSharp {
            fluid(maxWidth: 2400, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
