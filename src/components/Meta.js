import React from 'react'
import styled from 'styled-components'
import { displayDate } from '../utils'

const Meta = styled.h3`
  font-weight: 200;
  margin-bottom: 1rem;
`

export default ({ date, children }) => {
  if (date) {
    children = displayDate(date)
  }
  return <Meta>{children}</Meta>
}
