import React from 'react'
import styled from 'styled-components'
import { displayDate } from '../utils'

const Meta = styled.h3`
  font-weight: 200;
  margin-bottom: 1rem;
`

export default ({ date, author }) => {
  return (
    <Meta>
      {author}
      {author && date && ' — '}
      {!!date && displayDate(date)}
    </Meta>
  )
}
