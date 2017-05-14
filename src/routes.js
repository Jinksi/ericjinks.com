import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import App from './components/app'
import About from './components/about'
import Sketches from './components/sketches'
import SketchSingle from './components/sketch-single'
import NoMatch from './components/nomatch'

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="about" component={About} />
        <Route path="sketches" component={Sketches}>
        </Route>
        <Route path="sketch/:sketchid" component={SketchSingle} />
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  )
}
