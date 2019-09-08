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
    frontmatter: { title, author, date, image, cardimage, excerpt },
    fields: { slug, editLink },
    rawMarkdownBody: content,
  } = post

  const { author: siteAuthor } = site.siteMetadata

  return (
    <Layout location={location}>
      <SocialMeta
        title={title}
        pathname={location.pathname}
        absoluteImageUrl={cardimage && cardimage.publicURL}
        description={excerpt}
      />
      <Page white>
        <PostHeader
          image={image && image.childImageSharp}
          title={title}
          date={date}
          author={author || siteAuthor}
          location={location}
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
        excerpt
        cardimage {
          publicURL
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2400, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
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
