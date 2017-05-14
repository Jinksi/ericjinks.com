import React from 'react'
import { Link } from 'react-router'
import Twitter from 'react-icons/lib/io/social-twitter'
import Github from 'react-icons/lib/io/social-github'
import Envelope from 'react-icons/lib/io/ios-email'
import Instagram from 'react-icons/lib/io/social-instagram'

class Question extends React.Component {
    render() {
        return <h3> Lets go for a <FaBeer />? </h3>
    }
}

export default (props) => {
  return (
    <header className="header">
      <div className="container row">
        <div className="animated fadeIn four columns vertmid">
          <h1 className="logo"><Link to="/">
            <span>Eric</span><span>Jinks</span>
          </Link></h1>
          <div className="info">
            <div className="typed"></div>
          </div>
          <nav className="nav">
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/sketches">Sketches</Link></li>
            </ul>
          </nav>
          <ul className="social">
            <li>
              <a href="http://twitter.com/jinksi" title="twitter.com/jinksi">
                <Twitter />
              </a>
            </li>
            <li>
              <a href="http://github.com/jinksi" title="github.com/jinksi">
                <Github />
              </a>
            </li>
            <li>
              <a href="http://instagram.com/jinksi" title="instagram.com/jinksi">
                <Instagram />
              </a>
            </li>
            <li>
              <a href="mailto:ericjinks@gmail.com" title="ericjinks@gmail.com">
                <Envelope />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
