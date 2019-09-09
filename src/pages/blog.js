import React from 'react'

import Layout from '../components/Layout'
import Page from '../components/Page'
import SocialMeta from '../components/SocialMeta'
import PostList from '../components/PostList'

export default ({ location }) => {
  return (
    <Layout location={location}>
      <SocialMeta title={'Blog'} pathname={location.pathname} />
      <Page white>
        <PostList />
      </Page>
    </Layout>
  )
}
