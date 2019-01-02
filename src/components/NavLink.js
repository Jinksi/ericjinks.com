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
  &:active,
  &:focus {
    color: inherit;
  }

  & + * {
    margin-left: 1rem;
  }
`

export default ({ path, exact, ...props }) => (
  <NavLink
    to={path}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        active: {
          color: isCurrent,
        },
      }
    }}
  >
    {props.title}
  </NavLink>
)
