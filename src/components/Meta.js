import React from 'react'
import styled from 'styled-components'
import { displayDate } from '../utils'

import ProfilePic from './ProfilePic'

const Sep = styled.span`
  display: none;
`
const Meta = styled.div`
  font-size: 2.1rem;
  font-weight: 200;
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 500px) {
    flex-direction: row;

    & > * + * {
      margin-left: 0.7em;
    }

    ${Sep} {
      display: inline-block;
    }
  }
`

export default ({ date, dateFormatted, author }) => {
  return (
    <Meta>
      {author && <ProfilePic size={45} />}
      {author && <span>{author}</span>}
      {author && date && <Sep> — </Sep>}
      {!!date && <time dateTime={date}>{displayDate(dateFormatted)}</time>}
    </Meta>
  )
}
