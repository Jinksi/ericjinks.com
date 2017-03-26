import React from 'react'
import styled from 'styled-components'

const SocialsWrap = styled.div`
  margin-left: auto;
`

const SocialLink = styled.a`
  text-decoration: none;
  padding: .5rem;
  display: inline-block;
  + * {
    margin-left: 1rem;
  }
`

export default () => (
  <SocialsWrap>
    <SocialLink target='_blank' href='https://twitter.com/jinksi'>TW</SocialLink>
    <SocialLink target='_blank' href='https://github.com/Jinksi'>GH</SocialLink>
  </SocialsWrap>
)
