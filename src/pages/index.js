import React from 'react'
import styled from 'styled-components'

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
  Relative,
} from '../components/common'
import PostList from '../components/PostList'
import Wave from '../components/Wave'

const HeadSection = styled(Section)`
  padding-bottom: 0;
  padding-top: 7rem;
  position: relative;
  color: var(--white);
`

const HomeTitle = styled(Title)`
  color: var(--black);

  .background {
    background-color: var(--white);
  }
`

export default ({ location }) => {
  return (
    <Layout location={location}>
      <SocialMeta />

      <HeadSection>
        <Relative>
          <Container skinny>
            <Flex alignCenter>
              <Col>
                <ProfilePic size={125} />
                <HomeTitle>
                  <div className="background animate-translate animate-translate-mobile" />
                  <span>Eric Jinks</span>
                </HomeTitle>
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
        </Relative>
      </HeadSection>

      <Wave />
      <Page>
        <PostList postCount={3} />
      </Page>
    </Layout>
  )
}
