import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import _get from 'lodash/get'
import _sortBy from 'lodash/sortBy'
import ArrowRight from 'react-feather/dist/icons/arrow-right'

import Page from '../components/Page'
import { Section, Container, TextContainer } from '../components/common'
import { displayDate } from '../utils'

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

  .date {
    font-weight: 200;
    margin-bottom: 1rem;
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

export default () => {
  const data = useStaticQuery(graphql`
    query {
      jsPosts: allJavascriptFrontmatter(
        filter: { fields: { slug: { glob: "/blog/**" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
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
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
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
  `)
  let jsPosts = _get(data, 'jsPosts.edges', [])
  let mdPosts = _get(data, 'mdPosts.edges', [])
  let posts = _sortBy(
    [...jsPosts, ...mdPosts].map(edge => ({ ...edge.node })),
    'frontmatter.date'
  ).reverse()
  return (
    <Section thin>
      <Container skinny>
        <TextContainer style={{ padding: '5rem 0' }}>
          {posts &&
            posts.map(post => (
              <div style={{ margin: '0 auto 5rem auto' }} key={post.id}>
                <StyledLink to={post.fields.slug}>
                  <h2>{post.frontmatter.title}</h2>
                  <h3 className="date">{displayDate(post.frontmatter.date)}</h3>
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
  )
}
