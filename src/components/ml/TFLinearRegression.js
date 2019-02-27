import React from 'react'
import * as tf from '@tensorflow/tfjs'
import Two from 'two.js'

export default class LinearRegression extends React.Component {
  canvas = null
  two = null
  x_vals = []
  y_vals = []
  points = []
  learningRate = 0.5
  m = null
  b = null

  componentDidMount() {
    this.initTf()
    this.initTwo()
  }

  componentDidUpdate() {
    this.destroyTwo()
    this.destroyTf()
    this.initTf()
    this.initTwo()
  }

  componentWillUnmount() {
    this.destroyTf()
    this.destroyTwo()
  }

  initTf = () => {
    // initial slope value
    this.m = tf.variable(tf.scalar(Math.random()))
    //  initial y intercept value
    this.b = tf.variable(tf.scalar(Math.random()))
  }

  optimizer = tf.train.sgd(this.learningRate)

  loss = (yPred, y) =>
    yPred
      .sub(y)
      .square()
      .mean()

  predict = x =>
    tf.tidy(() => {
      // Create a vector of X values
      const xVector = tf.tensor1d(x)
      // y = mx + b
      const yPred = xVector.mul(this.m).add(this.b)
      return yPred
    })

  train = () => {
    tf.tidy(() => {
      if (this.x_vals.length > 0) {
        const y = tf.tensor1d(this.y_vals)
        this.optimizer.minimize(() => this.loss(this.predict(this.x_vals), y))
      }
    })
  }

  destroyTf = () => tf.disposeVariables()

  destroyTwo = () => {
    if (this.two) {
      this.two.clear()
      this.two.renderer.domElement.remove()
      this.two.unbind()
    }
  }

  initTwo = () => {
    this.x_vals = []
    this.y_vals = []
    this.points = []
    const w = Math.min(window.innerWidth * 0.9, 600)
    const options = { width: w, height: 400 }
    const colours = ['#272727']
    this.two = new Two(options).appendTo(this.canvas)
    const { two } = this
    two.renderer.domElement.onclick = this.handleClick
    two.renderer.domElement.style.cursor = 'pointer'
    this.two.renderer.domElement.style.margin = 'auto'
    this.two.renderer.domElement.style.display = 'block'

    const { width, height } = options

    const rect = two.makeRectangle(width / 2, height / 2, width, height)
    rect.stroke = colours[0]

    // const addPointRandom = () =>
    //   this.addpoint(Math.random() * width, Math.random() * height)

    const line = two.makeLine(
      0,
      Math.random() * width,
      width,
      Math.random() * height
    )
    line.stroke = '#272727'
    line.linewidth = 2

    const updateTwo = () =>
      tf.tidy(() => {
        this.train()

        if (this.x_vals.length > 0) {
          const lineXs = [-1, 1]
          const lineYPredict = this.predict(lineXs)
          lineYPredict.data().then(lineYs => {
            line.vertices[0].set(lineXs[0] * width, height * lineYs[0])
            line.vertices[1].set(lineXs[1] * width, height * lineYs[1])
            line.translation.set(0, 0)
          })
        }
      })

    two.bind('update', updateTwo).play()
  }

  addpoint = (x, y) => {
    const { two } = this
    if (!two) return
    const { width, height } = two

    const point = two.makeCircle(x, y, 5)
    point.fill = '#272727'
    point.noStroke()
    this.points.push(point)
    this.x_vals.push(x / width)
    this.y_vals.push(y / height)

    if (this.x_vals.length > 6) {
      this.x_vals = this.x_vals.slice(-1)
      this.y_vals = this.y_vals.slice(-1)
      this.points.slice(0, -1).forEach(point => point.remove())
    }
  }

  handleClick = e => this.addpoint(e.offsetX, e.offsetY)

  render() {
    const { style = {}, ...props } = this.props
    return (
      <div
        ref={el => {
          this.canvas = el
        }}
        style={{ margin: '0 auto', ...style }}
        {...props}
      />
    )
  }
}
