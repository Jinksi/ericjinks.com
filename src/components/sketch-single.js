import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { sketchData } from './sketches'

class SketchSingle extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render(){
    window.sketchComponent.updateSketch(this.props.params.sketchid)
    const sketch = sketchData.find(sketch => sketch.id === this.props.params.sketchid)
    const title = `${sketch.id} ${sketch.title} | Eric Jinks`
    const image = sketch.image
    let meta = []
    meta.push({'property': 'og:title', 'content': title})
    if(image) meta.push({'property': 'og:image', 'content': image})

    return (
      <div className="sketch-single">
        <Helmet
          title={title}
          meta={meta}
          />
      </div>
    )
  }

}

export default SketchSingle
