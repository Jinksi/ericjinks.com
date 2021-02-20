import React from 'react'
import styled from 'styled-components'
import Github from 'react-feather/dist/icons/github'

import Wave from './Wave'
import { Container } from './common'

const Footer = styled.footer`
  margin-top: auto;
  min-height: 250px;
`

const FooterInner = styled(Container)`
  font-size: 0.9em;
  padding: 10rem;
  text-align: center;
  color: var(--offWhite);
`

const Icon = styled.div`
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-right: 0.2em;
`
const GithubIcon = Icon.withComponent(Github)

export default () => (
  <Footer>
    <Wave flip />
    <FooterInner>
      <GithubIcon />{' '}
      <a href="https://github.com/jinksi/ericjinks.com">
        View source on GitHub
      </a>
    </FooterInner>
  </Footer>
)
