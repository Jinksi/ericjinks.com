import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import { Section, Flex } from '../components/common'
import Page from '../components/Page'
import Cube from '../components/Cube'

export default ({ location }) => (
  <Layout location={location}>
    <Page>
      <Section thick>
        <Flex justifyCenter fill>
          <Cube text="404" />
        </Flex>
      </Section>
      <Helmet title="404 – Page Not Found" />
    </Page>
  </Layout>
)
