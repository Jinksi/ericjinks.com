import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import Layout from '../components/Layout'

import MarkdownContent from '../components/MarkdownContent'
import SocialMeta from '../components/SocialMeta'
import PostHeader from '../components/PostHeader'
import PostFooter from '../components/PostFooter'

import { Container, Section, TextContainer } from '../components/common'

const BlogSingleTemplate = ({ location, data: { post, site } }) => {
  const {
    frontmatter: {
      title,
      author,
      date,
      dateFormatted,
      image,
      cardimage,
      excerpt,
    },
    fields: { slug, editLink },
    body,
  } = post

  const { author: siteAuthor } = site.siteMetadata

  return (
    <Layout location={location}>
      <article>
        <SocialMeta
          title={title}
          pathname={location.pathname}
          absoluteImageUrl={cardimage && cardimage.publicURL}
          description={excerpt}
        />
        <Page>
          <PostHeader
            image={image && image.childImageSharp}
            title={title}
            date={date}
            dateFormatted={dateFormatted}
            author={author || siteAuthor}
            location={location}
          />
          <Section thin>
            <Container>
              <TextContainer auto>
                <MarkdownContent body={body} />
              </TextContainer>
            </Container>
          </Section>
          <PostFooter editLink={editLink} slug={slug} title={title} />
        </Page>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    post: mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
        editLink
      }
      frontmatter {
        title
        date: date(formatString: "YYYY-MM-DD")
        dateFormatted: date(formatString: "MMMM DD, YYYY")
        excerpt
        # cardimage {
        #   publicURL
        # }
        # image {
        #   childImageSharp {
        #     fluid(maxWidth: 2400, quality: 75) {
        #       ...GatsbyImageSharpFluid_withWebp
        #     }
        #   }
        # }
      }
    }
  }
`

export default BlogSingleTemplate
