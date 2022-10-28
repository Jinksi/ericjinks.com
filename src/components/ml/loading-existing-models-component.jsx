import React, { Suspense, useState } from 'react'

const TFCNNDemo = React.lazy(() => import('./TFCNNDemo.jsx'))

const DemoComponent = () => {
  const [showTFComponent, setShowTFComponent] = useState(false)
  return (
    <>
      {showTFComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <TFCNNDemo />
        </Suspense>
      ) : (
        <button
          className="FancyButton"
          onClick={() => setShowTFComponent(true)}
        >
          Click to load example (~26MB)
        </button>
      )}
    </>
  )
}

export default DemoComponent
