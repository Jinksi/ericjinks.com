import { defineConfig } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  site: 'https://ericjinks.com',
  integrations: [mdx(), sitemap(), react(), svelte()],
  trailingSlash: 'always',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      langs: [
        'js',
        'html',
        'css',
        'r',
        'jsx',
        'typescript',
        'tsx',
        'docker',
        'python',
      ],
      theme: 'one-dark-pro',
    },
  },
  output: 'static',
  adapter: cloudflare(),
})
