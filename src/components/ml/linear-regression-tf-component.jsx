import React, { Suspense, useState } from 'react'

const TFLinearRegression = React.lazy(() => import('./TFLinearRegression'))

const DemoComponent = () => {
  const [showTFComponent, setShowTFComponent] = useState(false)
  return (
    <>
      {showTFComponent ? (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <TFLinearRegression />
            <br />
            <figcaption>Click the canvas to add points</figcaption>
          </Suspense>
        </>
      ) : (
        <button
          className="FancyButton"
          onClick={() => setShowTFComponent(true)}
        >
          Click to load example
        </button>
      )}
    </>
  )
}

export default DemoComponent
