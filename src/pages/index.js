import React from 'react'
import { useStaticQuery } from 'gatsby'

import Layout from '../components/Layout'
import Page from '../components/Page'
import SocialMeta from '../components/SocialMeta'
import ProfilePic from '../components/ProfilePic'
import {
  Title,
  Section,
  Container,
  TextContainer,
  Flex,
  Col,
} from '../components/common'
import { isWhiteTheme } from '../utils'

export default ({ location }) => {
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

  const whiteTheme = isWhiteTheme({ location })

  return (
    <Layout location={location}>
      <Page>
        <SocialMeta />
        <Section thin>
          <Container skinny>
            <Flex alignCenter>
              <Col>
                <ProfilePic
                  image={profilePic.childImageSharp}
                  whiteTheme={whiteTheme}
                  size={125}
                />
                <Title>
                  <div className="background animate-translate animate-translate-mobile" />
                  <span>Eric Jinks</span>
                </Title>
                <TextContainer>
                  <p>
                    I am a software engineer from the Gold Coast, Australia.
                  </p>
                  <p>
                    If you'd like to get in touch, send me an email at{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:ericjinks@gmail.com"
                    >
                      ericjinks@gmail.com
                    </a>{' '}
                    or find me on <a href="https://github.com/Jinksi">Github</a>{' '}
                    or <a href="https://twitter.com/jinksi">Twitter</a>
                  </p>
                </TextContainer>
              </Col>
            </Flex>
          </Container>
        </Section>
      </Page>
    </Layout>
  )
}
