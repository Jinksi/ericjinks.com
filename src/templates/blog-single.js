import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import _get from 'lodash/get'

import Page from '../components/Page'

import MarkdownContent from '../components/MarkdownContent'
import PostHeader from '../components/PostHeader'

import {
  Title,
  Flex,
  Container,
  Section,
  BackgroundImage,
  TextContainer,
} from '../components/common'

export default ({ data: { post, jsPost }, ...props }) => {
  if (!post) post = jsPost
  const {
    frontmatter: { title, date, image },
    rawMarkdownBody: content,
  } = post
  return (
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
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
