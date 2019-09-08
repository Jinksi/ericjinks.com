import React from 'react'
import { useStaticQuery } from 'gatsby'
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

export default ({ whiteTheme = false, size = 150 }) => {
  const { profilePic } = useStaticQuery(graphql`
    query {
      profilePic: file(relativePath: { eq: "eric.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <ProfilePic className="ProfilePic" whiteTheme={whiteTheme} size={size}>
      <BackgroundImage image={profilePic.childImageSharp} />
    </ProfilePic>
  )
}
