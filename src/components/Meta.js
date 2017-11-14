import React from 'react'
import styled from 'styled-components'
import _format from 'date-fns/format'

const Meta = styled.h3`
  font-weight: 200;
  margin-bottom: 1rem;
`

export default ({ date, children }) => {
  if (date) {
    children = _format(new Date(date), 'MMMM Do, YYYY')
  }
  return <Meta>{children}</Meta>
}
