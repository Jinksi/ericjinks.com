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

import TFLinearRegression from '../../../../components/ml/TFLinearRegression'

export const frontmatter = {
  title: 'Linear Regression with TensorFlow.js',
  excerpt: ``,
  category: 'Machine Learning',
  date: `2018-06-02`,
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
          <p>
            Recently, Google released{' '}
            <a href="https://js.tensorflow.org/">TensorFlow.js</a> which is
            JavaScript (browser & node) version of the open source machine
            learning framework, <a href="https://tensorflow.org">TensorFlow</a>.
          </p>
          <p>
            TensorFlow.js allows us to build, train and deploy ML models in the
            browser. Existing models compiled with TensorFlow or Keras can be{' '}
            <a href="https://js.tensorflow.org/tutorials/import-keras.html">
              converted and imported by TensorFlow.js
            </a>, ready for inference or further retraining of the model.
          </p>
          <p>
            To get my head around the API, I created a “hello world” linear
            regression model. In the canvas below, as you click to add points
            the linear regression model will train on the new coordinates over
            time, visualised by the predicted line.
          </p>
        </TextContainer>
        <TFLinearRegression />
      </Container>
    </Section>
  </div>
)
