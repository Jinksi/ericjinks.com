import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import { sketchData } from './sketches'

const AFRAMEcontainer = document.querySelector('#aframe-container')
const AFRAMEbutton = document.querySelector('#aframe-button')

function refresh(){
  browserHistory.setState({})
}

export default {
  current: null,
  all: sketchData,
  currentTitle: null,
  currentID: null,
  currentIndex: null,
  currentAudio: null,
  currentType: null,
  remove: function(){
    if(this.current){
      this.current.remove()
      this.current = null
    }
  },
  updateSketch: function(sketchid){
    if(!this.all){ return false }

    let newSketchIndex = !sketchid ?
    this.all.length - 1 :
    this.all.findIndex(sketch => sketch.id === sketchid)

    let newSketch = this.all[newSketchIndex]

    if(newSketch.id === this.currentID){ return false }

    ReactDOM.unmountComponentAtNode(AFRAMEcontainer)

    this.remove()

    this.currentTitle = newSketch.id + ' ' + newSketch.title.toLowerCase()
    this.currentID = newSketch.id
    this.currentAudio = newSketch.audio
    this.currentIndex = newSketchIndex
    this.currentType = newSketch.type

    if(this.currentType === 'aframe'){
      ReactDOM.render(<newSketch.file />, AFRAMEcontainer)
      document.querySelector('a-scene').addEventListener('enter-vr', () => {
        document.body.classList.add('sketch-vr')
        document.body.classList.add('sketch-fs')
        refresh()
      })
      document.querySelector('a-scene').addEventListener('exit-vr', () => {
        document.body.classList.remove('sketch-vr')
        document.body.classList.remove('sketch-fs')
        refresh()
      })
    } else {
      window.sketchComponent.current = new p5(newSketch.file)
      window.sketchComponent.current.resizeCanvas(window.innerWidth, window.innerHeight)
    }

    refresh()
  },
  toggleFullScreen: function(){
    let scene
    if(this.currentType === 'aframe'){
      scene = document.querySelector('a-scene')
      if(document.body.classList.contains('sketch-vr')) {
        scene.exitVR()
      } else {
        scene.enterVR()
      }
    } else {
      document.body.classList.toggle('sketch-fs')
    }
    refresh()
  },
  getPrev: function(){
    if(this.all[this.currentIndex - 1]){
      return this.all[this.currentIndex - 1]
    } else {
      return false
    }
  },
  getNext: function(){
    if(this.all[this.currentIndex + 1]){
      return this.all[this.currentIndex + 1]
    } else {
      return false
    }
  }
}

document.body.addEventListener('keydown', (e) => {
  const sketch = window.sketchComponent
  const path = '/sketch/'
  if(e.keyIdentifier === 'Left' && sketch.getPrev()){
    browserHistory.push({pathname: path + sketch.getPrev().id})
  }
  if(e.keyIdentifier === 'Right' && sketch.getNext()){
    browserHistory.push({pathname: path + sketch.getNext().id})
  }
  if(e.keyCode === 27){ // esc key
    browserHistory.replace({pathname: path + sketch.currentID})
    if(sketch.currentType !== 'aframe') sketch.toggleFullScreen()
  }
})
