import React, { Component } from 'react'
import { Link } from 'react-router'

import FullScreen from 'react-icons/lib/io/arrow-expand'
import Min from 'react-icons/lib/io/arrow-shrink'
import VMute from 'react-icons/lib/io/android-volume-off'
import VUp from 'react-icons/lib/io/android-volume-up'
import EnterVR from './enterVR'


export default class SketchTitle extends Component {

  constructor(props){
    super(props)
    this.sketch = this.props.sketchComponent
  }

  handleFsClick(e){
    this.props.sketchComponent.toggleFullScreen()
  }

  renderLeft(){
    const prev = this.sketch.getPrev()
    if(this.sketch.getPrev()){
      return (
        <Link to={ `/sketch/${prev.id}` } title="Previous (Left Arrow)">
          <span>&larr;</span>
        </Link>
      )
    }
  }

  renderRight(){
    const next = this.sketch.getNext()
    if(next){
      return (
        <Link to={ `/sketch/${next.id}` } title="Next (Right Arrow)">
          <span>&rarr;</span>
        </Link>
      )
    }
  }

  renderVol(){
    if(this.sketch.currentAudio){
      let vol = p5.soundOut.output.gain.value ? 1 : 0
      if(vol){
        return (
          <a href="#" onClick={this.muteToggle.bind(this)}>
            <VMute />
          </a>
        )
      } else {
        return (
          <a href="#" onClick={this.muteToggle.bind(this)}>
            <VUp />
          </a>
        )
      }
    }
  }
  renderVRButton(){
    if(this.sketch.currentType === 'aframe'){
      return <EnterVR />
    }
  }

  muteToggle(e){
    e.preventDefault()
    let mute = p5.soundOut.output.gain.value ? 0 : 1
    p5.soundOut.output.gain.value = mute
    this.forceUpdate()
  }

  render(){
    if(this.props.vr){
      return <div></div>
    }
    return (
      <div id="sketch-title">
        { this.renderVRButton() }
        { this.renderLeft() }
        <Link to={ `/sketch/${ this.sketch.currentID }` }
          title="Toggle Fullscreen (Esc key)"
          onClick={ this.handleFsClick.bind(this) }>
          <span>{ this.sketch.currentTitle }</span>
          { this.props.fs ? <Min /> : <FullScreen /> }
        </Link>
        { this.renderVol() }
        { this.renderRight() }
      </div>
    )
  }
}
