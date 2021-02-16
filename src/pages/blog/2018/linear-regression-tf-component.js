import React, { useState } from 'react'
import loadable from '@loadable/component'

import { FancyButton } from '../../../components/common'

const TFLinearRegression = loadable(() =>
  import('../../../components/ml/TFLinearRegression')
)

export default ({ location }) => {
  const [showTFComponent, setShowTFComponent] = useState(false)
  return (
    <>
      {showTFComponent ? (
        <>
          <TFLinearRegression />
          <br />
          <figcaption>Click the canvas to add points</figcaption>
        </>
      ) : (
        <FancyButton onClick={() => setShowTFComponent(true)}>
          Click to load example
        </FancyButton>
      )}
    </>
  )
}
