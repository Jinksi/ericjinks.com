import React from 'react'
import styled from 'styled-components'
import { Container, Flex } from './common'

import NavLink from './NavLink'
import NavIconButtons from './NavIconButtons'

const NavWrap = styled.div`
  color: ${props => (props.inverted ? `var(--white)` : `var(--color-text);`)};
`

const Nav = ({ routes, inverted }) => (
  <NavWrap inverted={inverted}>
    <Container>
      <Flex alignCenter flexWrap>
        {routes.map((route, i) => (
          <NavLink key={i} {...route} />
        ))}
        <NavIconButtons />
      </Flex>
    </Container>
  </NavWrap>
)

export default Nav
