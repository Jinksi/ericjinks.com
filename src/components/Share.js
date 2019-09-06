import React from 'react'
import styled from 'styled-components'
import { TwitterShareButton } from 'react-share'
import Twitter from 'react-feather/dist/icons/twitter'

const ShareWrap = styled.blockquote`
  width: 100%;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;

  .TwitterShareButton {
    display: inline;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 0.5rem;
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
  margin-right: 0.8em;
  flex-shrink: 0;
`

const TwitterIcon = Icon.withComponent(Twitter)

const Share = ({ url, title, twitterHandle }) => (
  <ShareWrap>
    <TwitterIcon className="Share--Icon" />
    <div>
      <span>
        If you liked this article and think others should read it, please
      </span>
      <TwitterShareButton
        className="TwitterShareButton"
        url={url}
        title={title}
        via={twitterHandle.split('@').join('')}
      >
        share it on Twitter.
      </TwitterShareButton>
    </div>
  </ShareWrap>
)

export default Share
