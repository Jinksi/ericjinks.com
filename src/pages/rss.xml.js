import { getCollection } from 'astro:content'

import rss from '@astrojs/rss'

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../config'

export const prerender = true

export async function GET() {
  const blog = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      tags: post.data.tags,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/blog/${post.id}/`,
    })),
  })
}
