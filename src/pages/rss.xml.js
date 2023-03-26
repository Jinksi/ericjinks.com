import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../config'

export async function get() {
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
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.slug}/`,
    })),
  })
}
