import React, { Component } from 'react'

import AFRAME from 'aframe'
import 'aframe-entity-generator-component'
import extras from 'aframe-extras'

export default class s017 extends Component {

  constructor(props){
    super(props)
  }
  componentDidMount(){

  }
  render(){

    extras.controls.registerAll()

    function renderEntities(){
      let ents = []
      const range = 1
      let col = 'white'
      for(let i = 0; i < 200; i++){
        let colRand = THREE.Math.randFloat(0,1)
        if(colRand < .333){
          col = 'coral'
        } else if (colRand < .666) {
          col = 'spiro'
        } else {
          col = 'white'
        }
        ents.push(
          <a-entity
          key={`vehicle-${i}`}
          position={`${THREE.Math.randFloat(-range, range)} ${THREE.Math.randFloat(-range, range)} ${THREE.Math.randFloat(-range, range)}`}
          mixin={`sphere firefly grow ${col}`}></a-entity>
        )
      }
      return ents
    }

    return(
      <a-scene vr-mode-ui="enabled: false" id="scene">
      <a-entity camera look-controls universal-controls="movementEnabled: false; touchControls: false"></a-entity>
      <a-mixin id="sphere" geometry="primitive: sphere; radius: 0.03"></a-mixin>
      <a-mixin id="firefly" s017vehicle></a-mixin>
      <a-mixin id="white" material="color: white; shader: flat"></a-mixin>
      <a-mixin id="spiro" material="color: #26C0F7; shader: flat"></a-mixin>
      <a-mixin id="coral" material="color: #FE5050; shader: flat"></a-mixin>
      <a-mixin id="flash" s017flash="0.5"></a-mixin>
      <a-mixin id="grow" s017grow="0.5"></a-mixin>
      { renderEntities() }

      <a-sky color="#111"></a-sky>
      </a-scene>

    )
  }
}

AFRAME.registerComponent('s017flash', {
  schema: {
    type: 'float',
    default: 1
  },
  init: function() {
    this.el.components.material.material.opacity = 0
    this.el.components.material.material.transparent = true
  },
  tick: function(t, tq) {
    this.el.components.material.material.opacity = 1 - Math.tan(
      ((t / 100) + this.el.object3D.id) * this.data
    )
  }
})
AFRAME.registerComponent('s017grow', {
  schema: {
    type: 'float',
    default: 1
  },
  init: function() {
    // this.el.components.scale = 1
  },
  tick: function(t, tq) {
    var mag = 1 - Math.cos(
      ((t / 100) + this.el.object3D.id) * this.data
    )
    this.el.object3D.scale.set(mag, mag, mag)
    this.el.object3D.scale.clampLength(0, 1)
  }
})

AFRAME.registerComponent('s017vehicle', {
  schema: {
    type: 'boolean'
  },
  init: function() {
    if (!AFRAME.vehicles)
      AFRAME.vehicles = []
    AFRAME.vehicles.push(this.el.object3D)
    var obj = this.el.object3D
    if (!obj.vel)
      obj.vel = new THREE.Vector3(0, 0, 0)
    if (!obj.acc)
      obj.acc = new THREE.Vector3(0, 0, 0)
    obj.desiredSeparation = THREE.Math.randFloat(2, 1)
    obj.maxSpeed = THREE.Math.randFloat(.07, 0.05)
    obj.maxForce = THREE.Math.randFloat(.001, .0005)
  },
  update: function() {

  },

  applyForce: function(force) {
    this.el.object3D.acc.add(force)
  },

  seek: function(target) {
    var obj = this.el.object3D
    var desired = new THREE.Vector3()
    desired.subVectors(target, obj.position)
    desired.setLength(obj.maxSpeed)

    // Steering = desired - velocity
    var steer = new THREE.Vector3()
    steer.subVectors(desired, obj.vel)
    steer.clampLength(-obj.maxForce, obj.maxForce)
    return steer
  },

  updatePos() {
    var obj = this.el.object3D
    obj.vel.add(obj.acc)
    obj.vel.clampLength(-obj.maxSpeed, obj.maxSpeed)
    obj.position.add(obj.vel)
    obj.acc.set(0, 0, 0)
  },

  separate: function(vehicles) {
    var obj = this.el.object3D
    var desiredSeparation = obj.desiredSeparation
    var sum = new THREE.Vector3(0, 0, 0)
    var count = 0
    for (var i = 0; i < vehicles.length; i++) {
      var d = obj.position.distanceTo(vehicles[i].position)
      if (d > 0 && d < desiredSeparation) {
        var diff = new THREE.Vector3()
        diff.subVectors(obj.position, vehicles[i].position)
        diff.normalize()
        diff.divideScalar(d) // weight by distance
        sum.add(diff)
        count++
      }
    }
    // Average the forces
    if (count > 0) {
      sum.divideScalar(count)
      sum.normalize()
      sum.multiplyScalar(obj.maxSpeed)

      // Steering = desired - velocity
      var steer = new THREE.Vector3()
      steer.subVectors(sum, obj.vel)
      steer.clampLength(-obj.maxForce, obj.maxForce)
      return steer
    } else {
      return new THREE.Vector3()
    }

  },

  tick: function() {
    var obj = this.el.object3D
      // turning circle

    var seekVector = new THREE.Vector3(0, 1.8, -3)
    var seekForce = this.seek(seekVector)

    var separateForce = this.separate(AFRAME.vehicles)
    separateForce.multiplyScalar(1.5)
    this.applyForce(seekForce)
    this.applyForce(separateForce)
    this.updatePos()
  }

})
