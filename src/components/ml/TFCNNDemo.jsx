import React from 'react'
import * as tf from '@tensorflow/tfjs'
import Uppy from 'uppy/lib/core'
import DragDrop from 'uppy/lib/plugins/DragDrop'
import 'uppy/dist/uppy.css'

import Loading from '../Loading'
import dogImage from './TFCNNDemo/dog.jpg'
import catImage from './TFCNNDemo/cat.jpg'

export default class LinearRegression extends React.Component {
  state = {
    predictionQueue: [],
    predictions: [],
    loading: true,
    error: null,
  }

  model = null

  componentDidMount() {
    this.initTf()
  }

  initTf = () => {
    tf.loadModel('/model-2018-06-17-21-37/model.json')
      .then(model => {
        this.model = model
        this.setState({ loading: false }, this.initUppy)
      })
      .catch(error => {
        this.setState({ error: 'Failed to load model', loading: false })
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
        const normalised = tf.div(resized, tf.fill([128, 128, 3], 255))
        // expand to a 4d tensor (width, height, channels, n images)
        const expanded = tf.cast(tf.expandDims(normalised), 'float32')
        // make prediction
        const timeStart = new Date()
        const prediction = this.model.predict(expanded)
        prediction.data().then(classificationData => {
          const timeEnd = new Date()
          const classificationName = classificationData[0] > 0.5 ? 'Dog' : 'Cat'
          const confidence =
            Math.round(Math.abs(classificationData[0] - 0.5) * 2 * 100) + '%'

          this.setState(prevState => ({
            predictions: [
              ...prevState.predictions,
              {
                classificationName,
                classificationData,
                confidence,
                duration: timeEnd - timeStart,
              },
            ],
          }))
        })
      }
    })

  initUppy = () => {
    Uppy({
      debug: true,
      autoProceed: true,
      restrictions: {
        maxFileSize: 5000000,
        // maxNumberOfFiles: 1,
        // minNumberOfFiles: 1,
        allowedFileTypes: ['image/*'],
      },
    })
      .use(DragDrop, {
        target: '.TFCNNDemoUppy',
        width: '100%',
        height: '100%',
        note:
          'Images are not uploaded to a server, they are processed in the browser',
        locale: {},
      })
      .on('file-added', file => this.addFileToQueue(file.data))
  }

  addImageToQueue = image => {
    this.setState(
      {
        predictionQueue: [...this.state.predictionQueue, image],
      },
      () => this.predict(image)
    )
  }

  addFileToQueue = file => {
    const reader = new FileReader()
    reader.onload = e => {
      this.setState(
        {
          predictionQueue: [...this.state.predictionQueue, reader.result],
        },
        () => this.predict(reader.result)
      )
    }
    reader.readAsDataURL(file)
  }

  render() {
    const { style = {}, ...props } = this.props
    const { predictions, predictionQueue, loading, error } = this.state

    const Img = ({ src, ...props }) => (
      <img
        src={src}
        alt={'Example'}
        style={{
          width: 'calc(25% - 1rem)',
          margin: '0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => this.addImageToQueue(src)}
        {...props}
      />
    )

    return (
      <div
        style={{ margin: '5rem auto', textAlign: 'center', ...style }}
        {...props}
      >
        <p>
          A convolutional neural network trained to classify an image as either
          a <em>Dog</em> or a <em>Cat</em>. Select an example image for
          prediction or upload your own.
        </p>
        {error && <code style={{ marginBottom: '2rem' }}>Error: {error}</code>}
        {loading ? (
          <Loading
            text="Loading the model (~26MB)"
            style={{ margin: '2rem auto' }}
          />
        ) : (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {predictionQueue.map((src, index) => {
                const { classificationName, confidence, duration } =
                  predictions[index] || {}
                return (
                  <div
                    key={src + index}
                    style={{
                      width: 'calc(50% - 1rem)',
                      margin: '2rem 0.5rem',
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '200px',
                        marginBottom: '1rem',
                      }}
                    />
                    <div style={{}}>
                      <strong>{classificationName}</strong>
                    </div>
                    <div>Confidence: {confidence || '...'}</div>
                    <div>Duration: {duration ? duration + 'ms' : '...'}</div>
                  </div>
                )
              })}
            </div>
            <Img src={catImage} alt="Cat Image" />
            <Img src={dogImage} alt="Dog Image" />

            <div className="TFCNNDemoOutput" />
            <div className="TFCNNDemoUppy" />
          </div>
        )}
      </div>
    )
  }
}
