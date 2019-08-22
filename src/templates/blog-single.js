import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Twitter from 'react-feather/dist/icons/twitter'
import Github from 'react-feather/dist/icons/github'

import Page from '../components/Page'
import Layout from '../components/Layout'

import MarkdownContent from '../components/MarkdownContent'
import SocialMeta from '../components/SocialMeta'
import PostHeader from '../components/PostHeader'
import Share from '../components/Share'

import { Container, Section, TextContainer } from '../components/common'

const Icon = styled.div`
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-right: 0.2em;
`
const TwitterIcon = Icon.withComponent(Twitter)
const GithubIcon = Icon.withComponent(Github)

const PostFooterWrap = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  text-align: center;

  .PostFooterWrap--Sep {
    margin: 0 0.7em;
  }

  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;

    .PostFooterWrap--Sep {
      display: none;
    }
  }
`

const PostFooter = ({ blogPostUrl, editLink }) => (
  <PostFooterWrap>
    <a
      target="_blank"
      rel="noopener noreferrer"
      // using mobile.twitter.com because if people haven't upgraded
      // to the new experience, the regular URL wont work for them
      href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
        blogPostUrl
      )}`}
    >
      <TwitterIcon /> Discuss on Twitter
    </a>
    {editLink && (
      <Fragment>
        <span className="PostFooterWrap--Sep">{` • `}</span>
        <a target="_blank" rel="noopener noreferrer" href={editLink}>
          <GithubIcon />
          Edit post on GitHub
        </a>
      </Fragment>
    )}
  </PostFooterWrap>
)

export default ({ location, data: { post, jsPost, site }, ...props }) => {
  if (!post) post = jsPost
  const {
    frontmatter: { title, author, date, image },
    fields: { slug, editLink },
    rawMarkdownBody: content,
  } = post

  const {
    siteUrl,
    author: siteAuthor,
    socialMediaCard: { twitterCreatorAccount: twitterHandle },
  } = site.siteMetadata

  const blogPostUrl = `${siteUrl}${slug}`

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
        <Section thin>
          <Container>
            <TextContainer auto>
              <PostFooter editLink={editLink} blogPostUrl={blogPostUrl} />
              <br />
              <Share
                url={blogPostUrl}
                title={title}
                twitterHandle={twitterHandle}
              />
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
        siteUrl
        socialMediaCard {
          twitterCreatorAccount
        }
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
    }
  }
`
