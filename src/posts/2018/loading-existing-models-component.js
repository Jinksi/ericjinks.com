import React, { useState } from 'react'
import loadable from '@loadable/component'

import { FancyButton } from '../../components/common'

const TFCNNDemo = loadable(() => import('../../components/ml/TFCNNDemo.js'))

const DemoComponent = () => {
  const [showTFComponent, setShowTFComponent] = useState(false)
  return (
    <>
      {showTFComponent ? (
        <TFCNNDemo />
      ) : (
        <FancyButton onClick={() => setShowTFComponent(true)}>
          Click to load example (~26MB)
        </FancyButton>
      )}
    </>
  )
}

export default DemoComponent
