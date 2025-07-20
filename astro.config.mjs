import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://ericjinks.com',
  integrations: [mdx(), sitemap(), react(), svelte(), tailwind({
    // Apply Tailwind only to React components and MDX files (hybrid approach)
    applyBaseStyles: false,
  })],
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
})
