import React from 'react'

import { Fixed } from './common'
import { isSSR } from '../utils'
import sketch016 from '../sketches/sketch016'
const CanvasSketch = React.lazy(() => import('../components/CanvasSketch'))

const BackgroundSketch = () => {
  if (isSSR) return null
  return (
    <Fixed>
      <CanvasSketch sketch={sketch016} />
    </Fixed>
  )
}

export default BackgroundSketch
