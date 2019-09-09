import React from 'react'
import { Container, Flex } from './common'

import NavLink from './NavLink'
import SocialLinks from './SocialLinks'

export default ({ routes }) => (
  <Container>
    <Flex alignCenter flexWrap>
      {routes.map((route, i) => (
        <NavLink key={i} {...route} />
      ))}
      <SocialLinks />
    </Flex>
  </Container>
)
