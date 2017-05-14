import React, { Component } from 'react'

import AFRAME from 'aframe'
import 'aframe-entity-generator-component'
import extras from 'aframe-extras'
import { Entity, Scene, Animation } from 'aframe-react';


AFRAME.registerShader('wireframe', {
  schema: {
    wireframeLinewidth: { default: 1 },
    wireframe: { default: true },
    // color: { default: '#ffffff' },
    // emissive: { default: '#ffffff' },
    // emissiveIntensity: { default: 1 }
  },
  /**
   * `init` used to initialize material. Called once.
   */
  init: function (data) {
    this.material = new THREE.MeshNormalMaterial(data)
    this.update(data)  // `update()` currently not called after `init`. (#1834)
  },
  /**
   * `update` used to update the material. Called on initialization and when data updates.
   */
  update: function (data) {
    this.material.wireframeLinewidth = data.wireframeLinewidth
    this.material.emissive = data.emissive
  }
})

class s019 extends React.Component {

  renderPyrs () {
    let items = []
    for(let i = 0; i < 30; i++){
      items.push(
        <Entity geometry={{ primitive: 'tetrahedron', radius: i * .3 }} material="shader: wireframe;" position={[0, 1, -10]}>
          <Animation attribute="rotation" dur={ 10000 + (i * 10) } repeat="indefinite" easing="linear" to="0 360 360"/>
        </Entity>
      )
    }
    return items
  }

  render () {
    extras.controls.registerAll()
    return (
      <Scene vr-mode-ui={{enabled: false}}>
        <Entity camera look-controls universal-controls="movementEnabled: false; touchControls: false"></Entity>
        {this.renderPyrs()}
      </Scene>
    );
  }
}

export default s019
