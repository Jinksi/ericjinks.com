import { defineAction } from 'astro:actions'
import { Counter, db, eq } from 'astro:db'
import { z } from 'astro:schema'

export const server = {
  getCounter: defineAction({
    input: z.object({
      counterName: z.string(),
    }),
    handler: async (input) => {
      const counterResult = await db
        .select()
        .from(Counter)
        .where(eq(Counter.name, input.counterName))
        .limit(1)
      const counter = counterResult?.[0]

      if (!counter) {
        throw new Error(`Counter ${input.counterName} not found`)
      }

      return counter
    },
  }),
  incrementCounter: defineAction({
    input: z.object({
      counterName: z.string(),
    }),
    handler: async (input) => {
      const counterResult = await db
        .select()
        .from(Counter)
        .where(eq(Counter.name, input.counterName))
        .limit(1)
      const counter = counterResult?.[0]

      if (!counter) {
        throw new Error(`Counter ${input.counterName} not found`)
      }

      const result = await db
        .update(Counter)
        .set({ count: counter.count + 1 })
        .where(eq(Counter.name, input.counterName))
        .returning({ count: Counter.count })

      return result[0]
    },
  }),
}
