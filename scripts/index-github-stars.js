#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs/promises'
import * as pagefind from 'pagefind'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const starsKey = '★'

async function indexGitHubStars() {
  console.log('Creating Pagefind index for GitHub stars...')

  try {
    // Read the GitHub stars data
    const starsDataPath = path.join(__dirname, '../src/data/github-stars.json')
    const starsData = JSON.parse(await fs.readFile(starsDataPath, 'utf-8'))

    // Create a Pagefind index
    const { index } = await pagefind.createIndex({
      forceLanguage: 'en',
      verbose: true,
    })

    console.log(`Indexing ${starsData.stars.length} GitHub repositories...`)

    // Index each repository as a separate record
    let indexedCount = 0
    for (const repo of starsData.stars) {
      const starredDate = new Date(repo.starredAt)
      const year = starredDate.getFullYear()

      // Create content for the repository
      const content = `${repo.description || 'No description available'}`

      // Add the repository as a custom record
      const { errors } = await index.addCustomRecord({
        url: repo.url,
        content: content,
        language: 'en',
        meta: {
          title: repo.nameWithOwner || 'Unknown Repository',
          // language: repo.primaryLanguage || '',
          [starsKey]: repo.stargazerCount?.toString() || '0',
        },
        filters: {
          // year: [year.toString()],
        },
        sort: {
          [starsKey]: repo.stargazerCount?.toString() || '0',
          date: repo.starredAt,
        },
      })

      if (errors.length > 0) {
        console.error(`Error indexing ${repo.nameWithOwner}:`, errors)
      } else {
        indexedCount++
      }
    }

    console.log(`Successfully indexed ${indexedCount} repositories`)

    // Write the index files
    console.log('Writing Pagefind index files...')
    const { errors: writeErrors } = await index.writeFiles({
      outputPath: './dist/pagefind',
    })

    if (writeErrors.length > 0) {
      console.error('Errors writing index files:', writeErrors)
    } else {
      console.log('Pagefind index created successfully!')
    }

    // Clean up
    await pagefind.close()
  } catch (error) {
    console.error('Error creating Pagefind index:', error)
    process.exit(1)
  }
}

// Run the indexing
indexGitHubStars()
