import React, { useState } from 'react'
import Helmet from 'react-helmet'
import loadable from '@loadable/component'

import Layout from '../../../../components/Layout'
import MarkdownContent from './../../../../components/MarkdownContent'
import PostHeader from '../../../../components/PostHeader'
import SocialMeta from '../../../../components/SocialMeta'

import {
  Container,
  Section,
  TextContainer,
  FancyButton,
} from '../../../../components/common'

const TFLinearRegression = loadable(() =>
  import('../../../../components/ml/TFLinearRegression')
)

export const frontmatter = {
  title: 'Linear Regression with TensorFlow.js',
  excerpt: ``,
  category: 'Machine Learning',
  date: `2018-06-02`,
}

const mdBlocks = {
  a: `
### Variables

As the points are added to the canvas, our model will attempt to learn the coefficients _m_ and _b_ of the function: _y = mx + b_. We initialise each with a random number.

_Note that we cannot use plain JS numbers, we must use \`tf.scalar\`._


\`\`\`js
// Our coefficient variables
const m = tf.variable(tf.scalar(Math.random())) // slope
const b = tf.variable(tf.scalar(Math.random())) // y intercept
\`\`\`


### Predict function

We create the linear equation using TensorFlow.js math operations. The \`tf.tidy()\` function will clear any tensors we create inside this function to avoid memory leaks.

\`\`\`js
const predict = x =>
  tf.tidy(() => {
    // Create a vector of x values
    const xVector = tf.tensor1d(x)
    // y = mx + b
    const yPred = xVector.mul(this.m).add(this.b)
    return yPred
  })
\`\`\`

### Training the model

With the initial random coefficient values, our prediction line will not fit our data at all. To train the model to learn ideal values for the coefficients, we will create the following:

- the __loss function__ will measure how well our linear equation fits the data. A lower loss value = closer fit.
- the __optimiser function__ will implement an algorithm that will adjust our coefficient values based on the output of the loss function.
- the __train function__ will iteratively run our optimiser function.

\`\`\`js
// loss function: mean squared error
const loss = (yPred, y) =>
  yPred.sub(y).square().mean()

// optimiser: stochastic gradient descent
const learningRate = 0.5
const optimizer = tf.train.sgd(learningRate)

// train function: running in the Two.js animation loop ~60 times per second
// optimiser.minimize() automatically adjusts our tf.variable coefficents
const train = () => {
  tf.tidy(() => {
    if (x_vals.length > 0) {
      const y = tf.tensor1d(y_vals)
      optimiser.minimize(() => loss(predict(x_vals), y))
    }
  })
}
\`\`\`

After each training loop, I have added a line with the predicted _y_ values for given _x_ values at each edge of the canvas.

\`\`\`js
// getting values from tensors is async
predict([-1, 1]).data().then(yVals => {
  // plot the Two.js line on the canvas
  two.makeLine(
    // x1, y1
    -1 * width, height * yVals[0]),
    // x2, y2
    1 * width, height * yVals[1]
})
\`\`\`

If you want to see more of the source code of this demo, [check out the repo on github](https://github.com/Jinksi/ericjinks.com/blob/master/src/components/ml/TFLinearRegression.js).
This demo is based on [Daniel Schiffman's video](https://www.youtube.com/watch?v=dLp10CFIvxI).
Head to the [Tensorflow.js docs](https://js.tensorflow.org/) for more info.

  `,
}

export default ({ location }) => {
  const [showTFComponent, setShowTFComponent] = useState(false)
  return (
    <Layout location={location}>
      <SocialMeta title={frontmatter.title} pathname={location.pathname} />
      <PostHeader
        image={frontmatter.image}
        title={frontmatter.title}
        date={frontmatter.date}
      />
      <Section thin>
        <Container>
          <TextContainer auto style={{ marginBottom: '4rem' }}>
            <p>
              Recently, Google released{' '}
              <a href="https://js.tensorflow.org/">TensorFlow.js</a> which is
              JavaScript (browser & node) version of the open source machine
              learning framework,{' '}
              <a href="https://tensorflow.org">TensorFlow</a>.
            </p>
            <p>
              TensorFlow.js allows us to build, train and deploy ML models in
              the browser. Existing models compiled with TensorFlow or Keras can
              be{' '}
              <a href="https://js.tensorflow.org/tutorials/import-keras.html">
                converted and imported by TensorFlow.js
              </a>
              , ready for inference or further retraining of the model.
            </p>
            <p>
              To get my head around the API, I created a “hello world” linear
              regression model. In the canvas below, as you click to add points,
              the linear regression model will be fit to the new data,
              visualised by the prediction line (using{' '}
              <a href="https://two.js.org/">Two.js</a>).
            </p>
          </TextContainer>

          {showTFComponent ? (
            <TFLinearRegression />
          ) : (
            <TextContainer auto>
              <FancyButton dark onClick={() => setShowTFComponent(true)}>
                Click to load example
              </FancyButton>
            </TextContainer>
          )}

          <TextContainer auto>
            {showTFComponent && (
              <figcaption>Click the canvas to add points</figcaption>
            )}
            <MarkdownContent source={mdBlocks.a} />
          </TextContainer>
        </Container>
      </Section>
    </Layout>
  )
}
