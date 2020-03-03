import React from 'react'
import styled from 'styled-components'

import Wave from './Wave'
import { Container } from './common'

const Footer = styled.footer`
  margin-top: auto;
  min-height: 50vh;
`

const FooterInner = styled(Container)`
  font-size: 1.4rem;
  padding-top: 1rem;
  text-align: right;
`

export default () => (
  <Footer>
    <Wave flip />
    <FooterInner></FooterInner>
  </Footer>
)
