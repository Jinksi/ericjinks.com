import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import anime from 'animejs'
import _throttle from 'lodash/throttle'

import ScrollToTop from './components/ScrollToTop'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'
import Home from './views/Home'
import Projects from './views/Projects'
import ProjectsSingle from './views/ProjectsSingle'
import Contact from './views/Contact'
import Blog from './views/Blog'
import BlogSingle from './views/BlogSingle'
import NoMatch from './views/NoMatch'
import Nav from './components/Nav'
import Footer from './components/Footer'
import globalStyles from './globalStyles'
import { PageWrap } from './components/common'
import data from './data.json'

const siteTitle = 'Eric Jinks'

class App extends Component {
  state = {
    data
  }
  windowHeight = window.innerHeight
  windowWidth = window.innerWidth

  componentWillMount () {
    // Causing non-fatal JS error, disabled for now
    // import('./netlifyIdentity')
    globalStyles()
  }

  componentDidMount () {
    window.addEventListener('mousemove', _throttle(this.handleMouseMove, 100))
    window.addEventListener(
      'devicemotion',
      _throttle(this.handleDeviceMotion, 100)
    )
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('devicemotion', this.handleDeviceMotion)
  }

  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection]

  handleDeviceMotion = e => {
    if (this.anim) this.anim.pause()
    const mouseX = e.acceleration.x * 1000
    const mouseY = e.acceleration.y * 1000
    const x = -(mouseX / this.windowWidth - 0.5) * 10
    const y = -(mouseY / this.windowHeight - 0.5) * 10
    this.anim = anime({
      targets: '.animate-translate.animate-translate-mobile',
      duration: 400,
      easing: 'easeOutCubic',
      scale: 1.05,
      translateX: x, // -0.5 -> 0.5
      translateY: y // -0.5 -> 0.5
    })
  }

  handleMouseMove = e => {
    if (this.anim) this.anim.pause()
    const mouseX = e.clientX
    const mouseY = e.clientY
    const x = -(mouseX / this.windowWidth - 0.5) * 10
    const y = -(mouseY / this.windowHeight - 0.5) * 10

    this.anim = anime({
      targets: '.animate-translate',
      duration: 400,
      easing: 'easeOutCubic',
      scale: 1.05,
      translateX: x, // -0.5 -> 0.5
      translateY: y // -0.5 -> 0.5
    })
  }

  render () {
    const posts = this.getDocuments('posts')
    const routes = [
      {
        title: 'About',
        path: '/',
        component: Home,
        exact: true
      },
      {
        title: 'Projects',
        path: '/projects/',
        component: Projects,
        exact: true
      },
      {
        title: 'Blog',
        path: '/blog/',
        component: Blog,
        exact: true,
        props: {
          posts: this.getDocuments('posts')
        }
      },
      {
        title: 'Contact',
        path: '/contact/',
        component: Contact,
        exact: true
      }
    ]

    return (
      <Router>
        <div>
          <ScrollToTop />
          <ServiceWorkerNotifications reloadOnUpdate />
          <PageWrap>
            <Helmet titleTemplate={`${siteTitle} | %s`} />
            <Nav routes={routes} />
            <Switch>
              {routes.map(({ component: Component, props, ...route }, i) => (
                <Route
                  {...route}
                  key={i}
                  render={() => <Component {...props} />}
                />
              ))}
              <Route
                path='/blog/:id+'
                render={route => <BlogSingle {...route} posts={posts} />}
              />
              <Route
                path='/:id'
                render={route => <ProjectsSingle {...route} />}
              />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </PageWrap>
        </div>
      </Router>
    )
  }
}

export default App
