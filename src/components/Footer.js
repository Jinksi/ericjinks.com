import React from 'react'
import styled from 'styled-components'

import { Container } from './common'

const Footer = styled.footer`
  margin-top: auto;
`

const FooterInner = styled(Container)`
  font-size: 1.4rem;
  padding-top: 1rem;
  text-align: right;
`

export default () => (
  <Footer>
    <FooterInner>
    </FooterInner>
  </Footer>
)
