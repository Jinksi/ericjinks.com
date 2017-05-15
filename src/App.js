import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import Home from './views/Home'
import Projects from './views/Projects'
import NoMatch from './views/NoMatch'
import Nav from './components/Nav'
import Footer from './components/Footer'
import globalStyles from './globalStyles'
import { PageWrap } from './components/common'

const siteTitle = 'Eric Jinks'
const routes = [
  {
    title: 'About',
    path: '/',
    component: Home,
    exact: true
  }, {
    title: 'Projects',
    path: '/projects',
    component: Projects
  }
]

class App extends Component {
  constructor () {
    super()
    this.state = {
      globalX: 0,
      globalY: 0
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidMount () {
    globalStyles()
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove (e) {
    this.setState({
      globalX: (e.clientX / window.innerWidth) - 0.5, // -0.5 -> 0.5
      globalY: (e.clientY / window.innerHeight) - 0.5 // -0.5 -> 0.5
    })
  }

  render () {
    return (
      <Router>
        <PageWrap>
          <Helmet titleTemplate={`${siteTitle} | %s`} />
          <Nav routes={routes} />
          <Switch>
            {routes.map(({component: Component, ...route}, i) => (
              <Route
                {...route}
                key={i}
                render={() => (
                  <Component
                    globalX={this.state.globalX}
                    globalY={this.state.globalY}
                  />
                )}
              />
            ))}
            <Route component={NoMatch} />
          </Switch>
          <Footer />
          {this.state.globalX}
          <br />
          {this.state.globalY}
        </PageWrap>
      </Router>
    )
  }
}

export default App
