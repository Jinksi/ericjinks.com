import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { padStart } from 'lodash'

import s001 from '../../sketches/001'
import s002 from '../../sketches/002'
import s003 from '../../sketches/003'
import s005 from '../../sketches/005'
import s006 from '../../sketches/006'
import s007 from '../../sketches/007'
import s008 from '../../sketches/008'
import s009 from '../../sketches/009'
import s010 from '../../sketches/010'
import s011 from '../../sketches/011'
import s012 from '../../sketches/012'
import s013 from '../../sketches/013'
import s014 from '../../sketches/014'
import s015 from '../../sketches/015'
import s016 from '../../sketches/016'
// import s017 from '../../sketches/017'
import s018 from '../../sketches/018'
// import s019 from '../../sketches/019'

export default (props) => {

  const renderLinks = () => {
    return sketchData.map((sketch, i) => {
      return (
        <li key={sketch.id}>
          <Link to={`/sketch/${sketch.id}`}>
            {sketch.id + ' ' + sketch.title}
          </Link>
        </li>
      )
    })
  }

  return (
    <div className="animated fadeIn">
      <Helmet title="Sketches | Eric Jinks" />
      <ul className="sketch-list">{renderLinks()}</ul>
      <p>
        these sketches are created with javascript using either <a href="https://p5js.org/" target="_blank">p5js</a>, <a href="http://threejs.org/" target="_blank">threejs</a> or <a href="https://aframe.io/" target="_blank">a-frame</a> (for the vr sketches).
      </p>
      <p>
        use the &larr; and &rarr; arrow keys to navigate sketches.<br/>
        use the <b>esc</b> key to toggle fullscreen.
      </p>
      <p>
        click the <b>vr</b> icon on webvr sketches to view fullscreen in 360°.
      </p>
    </div>
  )
}

export const sketchData = [

  {
    id: '001',
    title: 'perlin chaser',
    file: s001
  },
  {
    id:'002',
    title: 'toon trance',
    file: s002
  },
  {
    id:'003',
    title: 'saturn',
    file: s003
  },
  {
    id:'005',
    title: 'perlin Splatter',
    file: s005
  },
  {
    id:'006',
    title: 'frcs',
    file: s006
  },
  {
    id:'007',
    title: 'beltflow',
    file: s007
  },
  {
    id:'008',
    title: 'seek',
    file: s008
  },
  {
    id:'009',
    title: 'gaunt',
    file: s009
  },
  {
    id:'010',
    title: 'duophnic',
    file: s010
  },
  {
    id:'011',
    title: 'chime',
    file: s011,
    audio: true
  },
  {
    id:'012',
    title: 'search',
    file: s012
  },

  // TODO: work on WEBGL fix
  // {
  //   id:'013',
  //   title: 'swept',
  //   file: s013
  // },

  {
    id:'014',
    title: 'eqosystem',
    file: s014
  },
  {
    id:'015',
    title: 'phyllo',
    file: s015
  },
  {
    id:'016',
    title: 'shiw',
    file: s016
  },
  // {
  //   id:'017',
  //   title: 'aframe',
  //   file: s017,
  //   type: 'aframe'
  // },
  {
    id:'018',
    title: 'bioluminescence i',
    file: s018
  },
  // {
  //   id:'019',
  //   title: 'aframe ii',
  //   file: s019,
  //   type: 'aframe'
  // },


]
