import { column, defineDb, defineTable } from 'astro:db'

const Counter = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ unique: true }),
    count: column.number({ default: 0 }),
  },
})

export default defineDb({
  tables: { Counter },
})
