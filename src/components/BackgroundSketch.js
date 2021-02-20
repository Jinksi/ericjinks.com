import React from 'react'
import styled from 'styled-components'

import { Fixed } from './common'
import sketch016 from '../sketches/sketch016'
const CanvasSketch = React.lazy(() => import('../components/CanvasSketch'))

const BackgroundStyled = styled(Fixed)`
  [data-theme='dark'] & {
    opacity: 0.8;
  }
`

const BackgroundSketch = () => (
  <BackgroundStyled>
    <CanvasSketch sketch={sketch016} />
  </BackgroundStyled>
)

export default BackgroundSketch
