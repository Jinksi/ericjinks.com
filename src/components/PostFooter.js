import React, { Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Twitter from 'react-feather/dist/icons/twitter'
import Github from 'react-feather/dist/icons/github'

import Share from './Share'
import { Container, Section, TextContainer } from './common'

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

const PostFooter = ({ slug, editLink, title }) => {
  const {
    site: {
      siteMetadata: {
        siteUrl,
        socialMediaCard: { twitterCreatorAccount: twitterHandle },
      },
    },
  } = useStaticQuery(graphql`
    query PostFooter {
      site {
        siteMetadata {
          author
          siteUrl
          socialMediaCard {
            twitterCreatorAccount
          }
        }
      }
    }
  `)

  const blogPostUrl = `${siteUrl}${slug}`

  if (!slug) return null

  return (
    <Section thin>
      <Container>
        <TextContainer auto>
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
          <br />
          <Share
            url={blogPostUrl}
            title={title}
            twitterHandle={twitterHandle}
          />
        </TextContainer>
      </Container>
    </Section>
  )
}

export default PostFooter
