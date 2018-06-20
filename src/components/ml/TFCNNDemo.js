import React from 'react'
import * as tf from '@tensorflow/tfjs'
import Uppy from 'uppy/lib/core'
import DragDrop from 'uppy/lib/plugins/DragDrop'
import 'uppy/dist/uppy.css'

import dogImage from './TFCNNDemo/dog.jpg'
import catImage from './TFCNNDemo/cat.jpg'

export default class LinearRegression extends React.Component {
  state = {
    predictionQueue: [],
  }

  model = null

  componentDidMount() {
    this.initUppy()
    this.initTf()
  }

  initTf = () => {
    tf.loadModel('/model-2018-06-17-21-37/model.json').then(model => {
      this.model = model
    })
  }

  predict = imageSource =>
    tf.tidy(() => {
      const img = document.createElement('img')
      img.src = imageSource
      // wait for image to load
      img.onload = () => {
        // convert image into tensor3d (width, height, rgb)
        const imageData = tf.fromPixels(img)
        // resize to 128x128, enforcing float32
        const resized = tf.cast(
          tf.image.resizeBilinear(imageData, [128, 128]),
          'float32'
        )
        // normalise pixel values by dividing by 255
        const normalised = tf.div(newImage, tf.fill([128, 128, 3], 255))
        // expand to a 4d tensor (width, height, channels, n images)
        const expanded = tf.cast(tf.expandDims(normalised), 'float32')
        // make prediction
        const timeStart = new Date()
        const prediction = model.predict(predictme)
        prediction.data().then(classificationData => {
          const timeEnd = new Date()
          const classificationName = classificationData[0] > 0.5 ? 'Dog' : 'Cat'
          const confidence =
            Math.round(Math.abs(classificationData[0] - 0.5) * 2 * 100) + '%'

          return {
            classificationName,
            classificationData,
            confidence,
            duration: timeEnd - timeStart,
          }
        })
      }
    })

  initUppy = () => {
    const uppy = Uppy({
      debug: true,
      autoProceed: true,
      restrictions: {
        maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*'],
      },
    })
      .use(DragDrop, {
        target: '.TFCNNDemoUppy',
        width: '100%',
        height: '100%',
        note: 'Cat or Dog?',
        locale: {},
      })
      .on('file-added', file => this.addFileToQueue(file.data))
  }

  addImageToQueue = image => {
    this.setState({
      predictionQueue: [...this.state.predictionQueue, image],
    })
  }

  addFileToQueue = file => {
    const reader = new FileReader()
    reader.onload = e => {
      this.setState({
        predictionQueue: [...this.state.predictionQueue, reader.result],
      })
    }
    reader.readAsDataURL(file)
  }

  render() {
    const { style = {}, ...props } = this.props
    const { predictionQueue } = this.state

    const Img = ({ src, ...props }) => (
      <img
        src={src}
        style={{
          width: 'calc(50% - 1rem)',
          margin: '0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => this.addImageToQueue(src)}
      />
    )

    return (
      <div
        style={{ margin: '5rem auto', textAlign: 'center', ...style }}
        {...props}
      >
        <h3>Demo work in progress... 😅</h3>
        <p>Select an example image for prediction</p>
        <div style={{ opacity: 0.5, pointerEvents: 'none' }}>
          <Img src={catImage} />
          <Img src={dogImage} />
          {predictionQueue.map(src => <Img src={src} />)}
          <div className="TFCNNDemoOutput" />
          <div className="TFCNNDemoUppy" />
        </div>
      </div>
    )
  }
}
