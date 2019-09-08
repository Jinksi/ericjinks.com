import React from 'react'

import styled, { css } from 'styled-components'

import BackgroundImage from './BackgroundImage'

const ProfilePic = styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;

  ${props =>
    !props.whiteTheme &&
    css`
      mix-blend-mode: lighten;
    `}
`

export default ({ image, whiteTheme = false, size = 150 }) => (
  <ProfilePic className="ProfilePic" whiteTheme={whiteTheme} size={size}>
    <BackgroundImage image={image} />
  </ProfilePic>
)
