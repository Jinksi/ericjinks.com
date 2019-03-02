import React from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Page from '../components/Page'
import Card from '../components/Card'
import SocialMeta from '../components/SocialMeta'
import { Container, Section } from '../components/common'

const Projects = ({ location, data }) => {
  let jsProjects = _get(data, 'jsProjects.edges', [])
  let mdProjects = _get(data, 'mdProjects.edges', [])
  let projects = [...jsProjects, ...mdProjects].map(({ node }) => ({
    ...node,
    frontmatter: {
      ...node.frontmatter,
      image: _get(node, 'frontmatter.image.childImageSharp'),
    },
  }))

  return (
    <Layout location={location}>
      <SocialMeta title={'Projects'} pathname={location.pathname} />
      <Page>
        <Section thin>
          <Container>
            {projects.map(project => (
              <Card
                key={project.frontmatter.title}
                title={project.frontmatter.title}
                to={project.fields.slug}
                image={project.frontmatter.image}
                brightness={project.frontmatter.brightness}
              />
            ))}
          </Container>
        </Section>
      </Page>
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  {
    jsProjects: allJavascriptFrontmatter(
      filter: { fields: { slug: { glob: "/projects/**" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }

    mdProjects: allMarkdownRemark(
      filter: { fields: { slug: { glob: "/projects/**" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            image {
              childImageSharp {
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
