import React from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import Link from 'gatsby-link'
import anime from 'animejs'
import _throttle from 'lodash/throttle'

import globalStyles from '../globalStyles'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { PageWrap } from '../components/common'

class Template extends React.Component {
  componentWillMount() {
    globalStyles()
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      window.addEventListener('mousemove', _throttle(this.handleMouseMove, 100))
      window.addEventListener(
        'devicemotion',
        _throttle(this.handleDeviceMotion, 100)
      )
    }
  }

  componentWillUnmount() {
    if (typeof window !== undefined) {
      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('devicemotion', this.handleDeviceMotion)
    }
  }

  handleDeviceMotion = e => {
    if (this.anim) this.anim.pause()
    const mouseX = e.acceleration.x * 1000
    const mouseY = e.acceleration.y * 1000
    const x = -(mouseX / window.innerWidth - 0.5) * 10
    const y = -(mouseY / window.innerHeight - 0.5) * 10
    this.anim = anime({
      targets: '.animate-translate.animate-translate-mobile',
      duration: 400,
      easing: 'easeOutCubic',
      scale: 1.05,
      translateX: x, // -0.5 -> 0.5
      translateY: y, // -0.5 -> 0.5
    })
  }

  handleMouseMove = e => {
    if (this.anim) this.anim.pause()
    const mouseX = e.clientX
    const mouseY = e.clientY
    const x = -(mouseX / window.innerWidth - 0.5) * 10
    const y = -(mouseY / window.innerHeight - 0.5) * 10

    this.anim = anime({
      targets: '.animate-translate',
      duration: 400,
      easing: 'easeOutCubic',
      scale: 1.05,
      translateX: x, // -0.5 -> 0.5
      translateY: y, // -0.5 -> 0.5
    })
  }

  render() {
    const { children } = this.props
    const { title: siteTitle } = _get(this, 'props.data.site.siteMetadata')

    const routes = [
      {
        title: 'About',
        path: '/',
        exact: true,
      },
      {
        title: 'Projects',
        path: '/projects/',
        exact: true,
      },
      {
        title: 'Blog',
        path: '/blog/',
        exact: true,
      },
      {
        title: 'Contact',
        path: '/contact/',
        exact: true,
      },
    ]

    return (
      <PageWrap>
        <Helmet titleTemplate={`${siteTitle} | %s`}>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#212121" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="Eric Jinks" />
          <meta name="application-name" content="Eric Jinks" />
          <meta name="theme-color" content="#212121" />
        </Helmet>

        <Nav routes={routes} />

        {children()}

        <Footer />
      </PageWrap>
    )
  }
}

export default Template

export const pageQuery = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
