// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      showDate: z.boolean().optional(),
      tags: z.string(),
      cardImage: z.string().optional(),
    }),
  }),
  sketch: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      showDate: z.boolean().optional(),
      tags: z.string(),
      cardImage: z.string().optional(),
      previewImage: z.string().optional(),
    }),
  }),
}
