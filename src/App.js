import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import Home from './views/Home'
import Projects from './views/Projects'
import NoMatch from './views/NoMatch'
import Nav from './components/Nav'
import Footer from './components/Footer'
import globalStyles, { loadFonts } from './globalStyles'
import { PageWrap } from './components/common'

const siteTitle = 'Eric Jinks'
const routes = [
  {
    title: 'About',
    path: '/',
    component: Home,
    exact: true
  }, {
    title: 'Things',
    path: '/projects',
    component: Projects
  }
]

class App extends Component {
  componentDidMount () {
    globalStyles()
    loadFonts()
  }
  render () {
    return (
      <Router>
        <PageWrap>
          <Helmet titleTemplate={`${siteTitle} | %s`} />
          <Nav routes={routes} />
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </PageWrap>
      </Router>
    )
  }
}

export default App
