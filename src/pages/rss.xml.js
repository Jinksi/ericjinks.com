import { getCollection } from 'astro:content'

import rss from '@astrojs/rss'

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../config'

export const prerender = true

export async function GET() {
  const blog = await getCollection('blog')

  // Sort posts by pubDate in descending order (latest first)
  const sortedBlog = blog.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  )

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    // Optional enhancements
    language: 'en-us',
    generator: 'Astro',
    items: sortedBlog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Convert tags string to array if needed for RSS
      categories: post.data.tags?.split(',').map((tag) => tag.trim()),
      // Compute RSS link from post `id`
      link: `/blog/${post.id}/`,
      // Add unique identifier
      guid: `${SITE_URL}/blog/${post.id}/`,
    })),
  })
}
