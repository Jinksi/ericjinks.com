import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import netlify from '@astrojs/netlify/functions'

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
  output: 'hybrid',
  adapter: netlify({
    builders: true,
  }),
})
