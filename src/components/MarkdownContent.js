import React from 'react'
import styled from 'styled-components'
import Marked from 'react-markdown'

export default ({ source }) => (
  <Marked
    source={source}
    renderers={{
      Image
    }}
  />
)

const Image = styled.img`
  max-width: 100%;
  height: auto;
`
