import { glob } from 'astro/loaders'
// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      showDate: z.boolean().optional(),
      isDraft: z.boolean().optional(),
      tags: z.string(),
      cardImage: z.string().optional(),
    }),
  }),
  sketch: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/sketch',
    }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      showDate: z.boolean().optional(),
      isDraft: z.boolean().optional(),
      tags: z.string(),
      cardImage: z.string().optional(),
      previewImage: z.string().optional(),
    }),
  }),
}
