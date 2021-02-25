import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import _get from 'lodash/get'
import 'modern-normalize/modern-normalize.css'
import '@fontsource/fira-code/400.css'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { PageWrap } from '../components/common'
import { isSSR } from '../utils'

import '../globalStyle.scss'

const BackgroundSketch = React.lazy(() =>
  import('../components/BackgroundSketch')
)

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/'
  const routes = [
    {
      title: 'Home',
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

          <PageWrap transparent={isHome}>
            <Nav routes={routes} inverted={isHome} />
            <main>{children}</main>
          </PageWrap>

          <Footer />
        </Fragment>
      )}
    />
  )
}

export default Layout
