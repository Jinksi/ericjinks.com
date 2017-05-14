import React from 'react'
import Helmet from 'react-helmet'

export default (props) => {
  return (
    <div className="animated fadeIn">
      <Helmet title="About | Eric Jinks" />
      <p>
        i create audio-visual art with code, <br/>inspired by creative coding & generative art.
      </p>
    </div>
  )
}
