import { getCollection, type CollectionEntry } from 'astro:content'
import type { APIRoute } from 'astro'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { SITE_URL } from '../../config'

export const prerender = true

export async function getStaticPaths() {
  const blog = await getCollection('blog')

  return blog
    .filter((post) => !post.data.isDraft)
    .map((post) => ({
      params: { id: post.id },
      props: { post },
    }))
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> }

  try {
    // Try to read the raw markdown file
    const filePath = join(process.cwd(), 'src/content/blog', `${post.id}.md`)
    let rawContent = ''

    try {
      rawContent = await readFile(filePath, 'utf-8')
    } catch {
      // Try .mdx extension if .md doesn't exist
      const mdxPath = join(process.cwd(), 'src/content/blog', `${post.id}.mdx`)
      rawContent = await readFile(mdxPath, 'utf-8')
    }

    // Remove frontmatter (everything between --- and ---)
    const contentWithoutFrontmatter = rawContent.replace(
      /^---[\s\S]*?---\n/,
      ''
    )

    // Build clean markdown content with metadata header
    let content = `# ${post.data.title}\n\n`

    if (post.data.description) {
      content += `> ${post.data.description}\n\n`
    }

    content += `**Published:** ${post.data.pubDate.toDateString()}\n`

    if (post.data.updatedDate) {
      content += `**Updated:** ${post.data.updatedDate.toDateString()}\n`
    }

    if (post.data.tags) {
      content += `**Tags:** ${post.data.tags}\n`
    }

    content += `**URL:** ${SITE_URL}/blog/${post.id}/\n\n`
    content += '---\n\n'

    // Add the actual post content
    content += contentWithoutFrontmatter

    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    })
  } catch (error) {
    // Fallback: just return metadata if we can't read the file
    let content = `# ${post.data.title}\n\n`

    if (post.data.description) {
      content += `> ${post.data.description}\n\n`
    }

    content += `**Published:** ${post.data.pubDate.toDateString()}\n`
    content += `**URL:** ${SITE_URL}/blog/${post.id}/\n\n`
    content += '*Content not available in markdown format*'

    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    })
  }
}
