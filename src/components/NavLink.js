import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const NavLink = styled(Link)`
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
  &.active,
  &:focus {
    color: inherit;
    text-decoration: underline;
  }

  & + * {
    margin-left: 1rem;
  }
`

export default ({ path, exact, ...props }) => (
  <NavLink to={path} activeClassName="active" partiallyActive={path !== '/'}>
    {props.title}
  </NavLink>
)
