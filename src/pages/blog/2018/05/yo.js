import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import _get from 'lodash/get'

import MarkdownContent from './../../../../components/MarkdownContent'
import PostHeader from '../../../../components/PostHeader'

import {
  Title,
  Flex,
  Container,
  Section,
  BackgroundImage,
  TextContainer,
} from '../../../../components/common'

export const frontmatter = {
  title: 'Yo',
  excerpt: `Let's create a lightning-fast, offline-first static website with React`,
  date: `2018-05-25`,
}

export default () => (
  <div>
    <Helmet title={frontmatter.title} />
    <PostHeader
      image={frontmatter.image}
      title={frontmatter.title}
      date={frontmatter.date}
    />
    <Section thin>
      <Container>
        <TextContainer style={{ margin: 'auto' }}>
          <MarkdownContent />
        </TextContainer>
      </Container>
    </Section>
  </div>
)
