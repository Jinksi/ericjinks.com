import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
import react from '@astrojs/react'
export default defineConfig({
  site: 'https://ericjinks.com',
  integrations: [mdx(), sitemap(), react()],
  trailingSlash: 'always',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      langs: ['js', 'html', 'css', 'r', 'jsx', 'typescript', 'tsx', 'docker'],
      theme: 'one-dark-pro',
    },
  },
})
