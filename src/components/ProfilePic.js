import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import GatsbyImage from 'gatsby-image'

const ProfilePic = styled(GatsbyImage)`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  position: relative;
  border-radius: 50%;
  display: block;
  overflow: hidden;

  ${(props) =>
    props.blend &&
    css`
      mix-blend-mode: lighten;
    `}
`

export default ({ blend = false, size = 150 }) => {
  const { profilePic } = useStaticQuery(graphql`
    query {
      profilePic: file(relativePath: { eq: "eric.jpg" }) {
        large: childImageSharp {
          fluid(maxWidth: 300, quality: 75) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
        small: childImageSharp {
          fluid(maxWidth: 100, quality: 75) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  // Use large or small image src, depending on size prop
  const childImageSharp = size >= 100 ? profilePic.large : profilePic.small
  return (
    <ProfilePic
      className="ProfilePic"
      blend={blend}
      size={size}
      alt="Eric Jinks"
      {...childImageSharp}
    />
  )
}
