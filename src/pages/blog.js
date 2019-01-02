import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'
import _get from 'lodash/get'
import ArrowRight from 'react-feather/dist/icons/arrow-right'

import Layout from '../components/layout'
import Page from '../components/Page'
import Meta from '../components/Meta'
import { Section, Container, TextContainer } from '../components/common'

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;

  .readmore {
    display: inline-flex;
    align-items: center;

    svg {
      transition: all 0.2s ease-out;
    }
  }

  h2 {
    margin-bottom: 0;
    border-bottom: 1px solid transparent;
    display: inline-flex;
    transition: all 0.2s ease-out;
  }

  &:hover {
    h2 {
      border-bottom-color: currentColor;
    }

    .readmore {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }
`

export default ({ location, data }) => {
  let jsPosts = _get(data, 'jsPosts.edges', [])
  let mdPosts = _get(data, 'mdPosts.edges', [])
  let posts = [...jsPosts, ...mdPosts].map(edge => ({ ...edge.node }))

  return (
    <Layout location={location}>
      <Page white>
        <Helmet title="Blog" />
        <Section thin>
          <Container skinny>
            <TextContainer style={{ padding: '5rem 0' }}>
              {posts &&
                posts.map(post => (
                  <div style={{ margin: '0 auto 5rem auto' }}>
                    <StyledLink to={post.fields.slug}>
                      <h2>{post.frontmatter.title}</h2>
                      <Meta date={post.frontmatter.date} />
                      <p>{post.frontmatter.excerpt}</p>
                      <div className="readmore">
                        Read <ArrowRight style={{ height: '0.9em' }} />
                      </div>
                    </StyledLink>
                  </div>
                ))}
            </TextContainer>
          </Container>
        </Section>
      </Page>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    jsPosts: allJavascriptFrontmatter(
      filter: { fields: { slug: { glob: "/blog/**" } } }
      sort: { fields: [frontmatter___date], order: DESC }
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
