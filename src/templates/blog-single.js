import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import Layout from '../components/layout'

import MarkdownContent from '../components/MarkdownContent'
import PostHeader from '../components/PostHeader'

import { Container, Section, TextContainer } from '../components/common'

export default ({ location, data: { post, jsPost }, ...props }) => {
  if (!post) post = jsPost
  const {
    frontmatter: { title, date, image },
    rawMarkdownBody: content,
  } = post
  return (
    <Layout location={location}>
      <Page white>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <PostHeader image={image} title={title} date={date} />
        <Section thin>
          <Container>
            <TextContainer style={{ margin: 'auto' }}>
              <MarkdownContent source={content} />
            </TextContainer>
          </Container>
        </Section>
      </Page>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      rawMarkdownBody
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }

    jsPost: javascriptFrontmatter(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
