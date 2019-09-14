import React from 'react'

import Layout from '../components/Layout'
import { Section, Flex } from '../components/common'
import Page from '../components/Page'
import Cube from '../components/Cube'
import SocialMeta from '../components/SocialMeta'

export default ({ location }) => (
  <Layout location={location}>
    <SocialMeta title="404 – Page Not Found" />
    <Page>
      <Section thick>
        <Flex justifyCenter fill>
          <Cube text="404" />
        </Flex>
      </Section>
    </Page>
  </Layout>
)
