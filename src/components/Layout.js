import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import anime from 'animejs'
import _get from 'lodash/get'
import _throttle from 'lodash/throttle'

import GlobalStyle from '../globalStyles'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { PageWrap } from '../components/common'
import { isSSR } from '../utils'

const BackgroundSketch = React.lazy(() =>
  import('../components/BackgroundSketch')
)

class Template extends React.Component {
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
    const { children, location } = this.props
    const isHome = location.pathname === '/'
    const routes = [
      {
        title: 'Eric Jinks',
        path: '/',
        exact: true,
      },
      {
        title: 'Blog',
        path: '/blog/',
        exact: true,
      },
    ]

    return (
      <StaticQuery
        query={graphql`
          {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Fragment>
            <PageWrap transparent={isHome}>
              <Helmet>
                <title>{_get(data, 'site.siteMetadata.title')}</title>
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
                <link
                  rel="mask-icon"
                  href="/safari-pinned-tab.svg"
                  color="#212121"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="apple-mobile-web-app-title" content="Eric Jinks" />
                <meta name="application-name" content="Eric Jinks" />
                <meta name="theme-color" content="#212121" />
              </Helmet>

              {!isSSR && (
                <React.Suspense fallback={null}>
                  <BackgroundSketch />
                </React.Suspense>
              )}

              <Nav routes={routes} inverted={isHome} />

              {children}

              <GlobalStyle />
            </PageWrap>
            <Footer />
          </Fragment>
        )}
      />
    )
  }
}

export default Template
