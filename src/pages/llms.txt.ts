import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../config'

export const prerender = true

export const GET: APIRoute = async () => {
  const blog = await getCollection('blog')

  // Sort posts by pubDate in descending order (latest first)
  const sortedBlog = blog
    .filter((post) => !post.data.isDraft)
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    )

  // Group posts by year for better organisation
  const postsByYear = sortedBlog.reduce((acc, post) => {
    const year = new Date(post.data.pubDate).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof sortedBlog>)

  // Build the llms.txt content
  let content = `# ${SITE_TITLE} - Software Engineering Blog\n`
  content += `> ${SITE_DESCRIPTION}\n\n`

  // Recent posts section (last 5 posts)
  const recentPosts = sortedBlog.slice(0, 5)
  if (recentPosts.length > 0) {
    content += `## Recent Posts\n`
    for (const post of recentPosts) {
      const url = `${SITE_URL}/blog/${post.id}/`
      content += `- [${post.data.title}](${url}): ${post.data.description}\n`
    }
    content += '\n'
  }

  // Posts by year sections
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a) // Most recent years first

  for (const year of years) {
    const yearPosts = postsByYear[year]
    content += `## ${year} Posts\n`
    for (const post of yearPosts) {
      const url = `${SITE_URL}/blog/${post.id}/`
      content += `- [${post.data.title}](${url}): ${post.data.description}\n`
    }
    content += '\n'
  }

  // Additional useful pages
  content += `## Additional Resources\n`
  content += `- [Blog Archive](${SITE_URL}/blog/): Complete list of all blog posts\n`
  content += `- [RSS Feed](${SITE_URL}/rss.xml): Subscribe to updates\n`
  content += `- **Raw Markdown:** Individual posts available as \`/blog/{post-id}.md\` for direct content access\n`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}