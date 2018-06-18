import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import _get from 'lodash/get'

import Page from '../components/Page'
import Meta from '../components/Meta'
import MarkdownContent from '../components/MarkdownContent'

import {
  Title,
  Flex,
  Container,
  Section,
  BackgroundImage,
  TextContainer,
} from '../components/common'

const Header = styled(Section)`
  overflow: hidden;
  position: relative;
  mix-blend-mode: lighten;
  height: ${props => (props.image ? '35vw' : 'auto')};
  min-height: 25rem;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export default ({ data: { post } }) => {
  const {
    frontmatter: { title, date, image },
    rawMarkdownBody: content,
  } = post

  return (
    <Page>
      <Header image={!!image}>
        {image && (
          <BackgroundImage
            className="animate-translate animate-translate-mobile"
            style={{
              transform: `scale(1.1)`,
            }}
            innerRef={el => {
              this.headerBG = el
            }}
            image={image}
          />
        )}
        <Container>
          <Flex column alignStart>
            <Title>
              <div className="background animate-translate animate-translate-mobile" />
              <span>{title}</span>
            </Title>
            <Meta date={date} />
          </Flex>
        </Container>
      </Header>
      <Section thin>
        <Container>
          <TextContainer>
            <MarkdownContent source={content} />
          </TextContainer>
        </Container>
      </Section>
      <Helmet title={title} />
    </Page>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      rawMarkdownBody
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
