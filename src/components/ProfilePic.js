import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import GatsbyImage from 'gatsby-image'

const ProfilePic = styled(GatsbyImage)`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  position: relative;
  border-radius: 50%;
  display: block;
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
          fluid(maxWidth: 150) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)
  return (
    <ProfilePic
      className="ProfilePic"
      whiteTheme={whiteTheme}
      size={size}
      alt="Eric Jinks"
      {...profilePic.childImageSharp}
    />
  )
}
