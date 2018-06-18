import React from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import URL from 'url-parse'

import Page from '../components/Page'
import Card from '../components/Card'
import { Section, Container, TextContainer } from '../components/common'
import { getPostSlug } from '../utils'

export default ({ data }) => {
  let jsPosts = _get(data, 'jsPosts.edges', [])
  let mdPosts = _get(data, 'mdPosts.edges', [])
  let posts = [...jsPosts, ...mdPosts].map(edge => ({ ...edge.node }))

  return (
    <Page>
      <Section thin>
        <Container skinny>
          <TextContainer>
            {posts &&
              posts.map(post => (
                <Card
                  key={`blog-${post.frontmatter.title}`}
                  to={post.fields.slug}
                  title={post.frontmatter.title}
                  excerpt={post.frontmatter.excerpt}
                  date={post.frontmatter.date}
                />
              ))}
          </TextContainer>
        </Container>
      </Section>
      <Helmet title="Blog" />
    </Page>
  )
}

export const pageQuery = graphql`
  query blogIndexQuery {
    jsPosts: allJavascriptFrontmatter(
      filter: { fields: { slug: { glob: "/blog/**" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
            date
          }
        }
      }
    }

    mdPosts: allMarkdownRemark(
      filter: { fields: { slug: { glob: "/blog/**" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
            date
          }
        }
      }
    }
  }
`
