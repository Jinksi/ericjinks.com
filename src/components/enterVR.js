import React, { Component } from 'react'

export default class enterVR extends Component{
  constructor(props){
    super(props)
  }
  onPress(){
    if(AFRAME){
      const sketchComponent = window.sketchComponent
      return sketchComponent.toggleFullScreen()
    }
    return false
  }
  render(){
    return(
      <button className="a-enter-vr-button" onClick={() => this.onPress()}></button>
    )
  }
}
