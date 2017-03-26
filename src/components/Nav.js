import React from 'react'
import { Container, Flex } from './common'

import NavLink from './NavLink'
import SocialLinks from './SocialLinks'

export default (props) => (
  <Container>
    <Flex alignCenter>
      {props.routes.map((route, i) => (
        <NavLink key={i} {...route} />
      ))}
      <SocialLinks />
    </Flex>
  </Container>
)
