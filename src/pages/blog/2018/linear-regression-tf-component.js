import React, { useState } from 'react'
import loadable from '@loadable/component'

import { TextContainer, FancyButton } from '../../../components/common'

const TFLinearRegression = loadable(() =>
  import('../../../components/ml/TFLinearRegression')
)

export default ({ location }) => {
  const [showTFComponent, setShowTFComponent] = useState(false)
  return (
    <>
      {showTFComponent ? (
        <TFLinearRegression />
      ) : (
        <TextContainer auto>
          <FancyButton onClick={() => setShowTFComponent(true)}>
            Click to load example
          </FancyButton>
        </TextContainer>
      )}
    </>
  )
}
