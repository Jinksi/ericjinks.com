import React from 'react'
import { Route } from 'react-router-dom'
import Link from 'gatsby-link'
import styled from 'styled-components'

import { color } from '../globalStyles'

const NavLink = styled.span`
  a {
    padding: 0.5rem;
    display: block;
    font-weight: 400;
    transition: color 0.2s, border-color 0.2s;
    color: inherit;
    text-decoration: none;
    border: 1px solid transparent;
    border-bottom-color: ${props =>
      props.active ? 'currentColor' : 'transparent'};

    &:hover,
    &:active,
    &:focus {
      color: inherit;
    }
  }

  & + * {
    margin-left: 1rem;
  }
`

export default ({ path, exact, ...props }) => (
  <Route
    path={path}
    exact={exact}
    children={({ match }) => (
      <NavLink active={match}>
        <Link to={path}>{props.title}</Link>
      </NavLink>
    )}
  />
)
