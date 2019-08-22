import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import Layout from '../components/Layout'

import MarkdownContent from '../components/MarkdownContent'
import SocialMeta from '../components/SocialMeta'
import PostHeader from '../components/PostHeader'
import PostFooter from '../components/PostFooter'

import { Container, Section, TextContainer } from '../components/common'

export default ({ location, data: { post, jsPost, site }, ...props }) => {
  if (!post) post = jsPost
  const {
    frontmatter: { title, author, date, image },
    fields: { slug, editLink },
    rawMarkdownBody: content,
  } = post

  const { author: siteAuthor } = site.siteMetadata

  return (
    <Layout location={location}>
      <SocialMeta title={title} pathname={location.pathname} />
      <Page white>
        <PostHeader
          image={image}
          title={title}
          date={date}
          author={author || siteAuthor}
        />
        <Section thin>
          <Container>
            <TextContainer auto>
              <MarkdownContent source={content} />
            </TextContainer>
          </Container>
        </Section>
        <PostFooter editLink={editLink} slug={slug} title={title} />
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
      fields {
        slug
        editLink
      }
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
      fields {
        slug
        editLink
      }
    }
  }
`
