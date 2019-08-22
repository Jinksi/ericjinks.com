import React from 'react'
import styled from 'styled-components'
import { TwitterShareButton, FacebookShareButton } from 'react-share'
import Twitter from 'react-feather/dist/icons/twitter'
import Facebook from 'react-feather/dist/icons/facebook'

const ShareWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;

  * {
    margin: 0 0.8rem;
  }

  .SocialMediaShareButton {
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }
`

const Icon = styled.div`
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-right: 0.3em;
`

const TwitterIcon = Icon.withComponent(Twitter)
const FacebookIcon = Icon.withComponent(Facebook)

const Share = ({ url, title, twitterHandle }) => (
  <ShareWrap>
    <span>Share article:</span>
    <TwitterShareButton
      url={url}
      title={title}
      via={twitterHandle.split('@').join('')}
    >
      <TwitterIcon className="Share--Icon" />
      Twitter
    </TwitterShareButton>
    <FacebookShareButton
      url={url}
      quote={title}
      via={twitterHandle.split('@').join('')}
    >
      <FacebookIcon />
      Facebook
    </FacebookShareButton>
  </ShareWrap>
)

export default Share
