import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import anime from 'animejs'
import _throttle from 'lodash/throttle'

import ScrollToTop from './components/ScrollToTop'
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

const siteTitle = 'Eric Jinks'

const posts = [
  {
    title: 'This is a blog post',
    date: 'Wed Nov 15 2017 07:10:05 GMT+1000 (AEST)',
    excerpt: `Let's discuss the meaning of life, the universe, and everything.`,
    slug: `/2017/11/this-is-a-blog-post`,
    content: `## Hello
This is a paragraph in Markdown.

- list
- item

\`code snippet\`
    `
  }
]

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
      posts
    }
  },
  {
    title: 'Contact',
    path: '/contact/',
    component: Contact,
    exact: true
  }
]

class App extends Component {
  constructor () {
    super()
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleDeviceMotion = this.handleDeviceMotion.bind(this)
    this.windowHeight = window.innerHeight
    this.windowWidth = window.innerWidth
  }

  componentWillMount () {
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

  handleDeviceMotion (e) {
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

  handleMouseMove (e) {
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
    return (
      <Router>
        <ScrollToTop>
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
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
