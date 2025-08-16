import { Counter, db } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
  await db
    .insert(Counter)
    .values([{ id: crypto.randomUUID(), name: 'adminCounter', count: 0 }])
}
