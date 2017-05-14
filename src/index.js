import React, { Component } from 'react'
import { render } from 'react-dom'

import { sketchData } from './components/sketches'
import Routes from './routes'
import SketchComponent from './components/sketch-component'

window.sketchComponent = SketchComponent

render((
  <Routes />
), document.getElementById('container'))
