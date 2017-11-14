import React from 'react'
import Helmet from 'react-helmet'

import Page from '../components/Page'
import Card from '../components/Card'
import { Section, Container, TextContainer } from '../components/common'
import { getPostSlug } from '../utils'

export default ({ posts }) => (
  <Page>
    <Section thin>
      <Container skinny>
        <TextContainer>
          {posts &&
            posts.map(post => (
              <Card
                bordered
                key={`blog-${post.date}`}
                to={`/blog${getPostSlug(post)}`}
                {...post}
              />
            ))}
        </TextContainer>
      </Container>
    </Section>
    <Helmet title='Blog' />
  </Page>
)
