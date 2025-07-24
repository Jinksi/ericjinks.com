#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env file
config()

const GITHUB_TOKEN = process.env.GH_TOKEN
const USERNAME = 'jinksi'
const PER_PAGE = 100
const LINGUIST_YAML_URL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
const CACHE_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'github-stars.json'
)

if (!GITHUB_TOKEN) {
  console.error('Error: GH_TOKEN environment variable is required')
  process.exit(1)
}

// Simple YAML parser for GitHub Linguist languages.yml structure
function parseLanguageYaml(yamlText) {
  const languages = {}
  const lines = yamlText.split('\n')
  let currentLanguage = null
  
  for (const line of lines) {
    // Match language name (starts at column 0, ends with colon)
    const languageMatch = line.match(/^([^:\s]+):$/)
    if (languageMatch) {
      currentLanguage = languageMatch[1]
      languages[currentLanguage] = {}
      continue
    }
    
    // Match color property (indented, starts with "color:")
    if (currentLanguage && line.match(/^\s+color:\s*["']?([^"'\s]+)["']?/)) {
      const colorMatch = line.match(/^\s+color:\s*["']?([^"'\s]+)["']?/)
      if (colorMatch) {
        languages[currentLanguage].color = colorMatch[1]
      }
    }
  }
  
  return languages
}

async function fetchLanguageColors() {
  console.log('Fetching GitHub Linguist language colors...')
  
  try {
    const response = await fetch(LINGUIST_YAML_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch languages.yml: ${response.status}`)
    }
    
    const yamlText = await response.text()
    const allLanguages = parseLanguageYaml(yamlText)
    
    console.log(`Parsed ${Object.keys(allLanguages).length} languages from GitHub Linguist`)
    return allLanguages
  } catch (error) {
    console.error('Error fetching language colors:', error)
    console.log('Continuing without language colors...')
    return {}
  }
}

async function fetchPage(page) {
  const url = `https://api.github.com/user/starred?per_page=${PER_PAGE}&page=${page}&sort=created&direction=desc`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      // Use star+json to include starred_at timestamp in response
      Accept: 'application/vnd.github.star+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!response.ok) {
    throw new Error(
      `GitHub API responded with ${response.status}: ${response.statusText} for page ${page}`
    )
  }

  const stars = await response.json()
  console.log(`Fetched page ${page} (${stars.length} repos)`)
  return stars
}

async function fetchAllStars() {
  console.log('Fetching GitHub starred repositories...')

  // First, get the first page to understand total count from headers
  const firstPage = await fetchPage(1)
  if (firstPage.length === 0) {
    return []
  }

  // Estimate total pages - we'll fetch in batches to avoid hitting all pages at once
  let allStars = [...firstPage]
  let page = 2
  const BATCH_SIZE = 10 // Fetch 10 pages at a time to be respectful to API

  while (true) {
    // Create batch of page requests
    const batchPromises = []
    for (let i = 0; i < BATCH_SIZE && page <= 50; i++) {
      // Cap at 50 pages (5000 repos) for safety
      batchPromises.push(fetchPage(page + i))
    }

    if (batchPromises.length === 0) break

    try {
      const batchResults = await Promise.all(batchPromises)
      let hasEmptyPage = false

      for (const pageStars of batchResults) {
        if (pageStars.length === 0) {
          hasEmptyPage = true
          break
        }
        allStars.push(...pageStars)
      }

      if (hasEmptyPage) break

      page += BATCH_SIZE

      // Small delay between batches to be respectful
      await new Promise((resolve) => setTimeout(resolve, 20))
    } catch (error) {
      console.error(`Error fetching batch starting at page ${page}:`, error)
      process.exit(1)
    }
  }

  return allStars
}

function transformStarData(stars) {
  return stars
    .map((starData) => {
      // With application/vnd.github.star+json header, response is { starred_at, repo }
      const repo = starData.repo

      // Add null safety checks
      if (!repo) {
        console.warn('Missing repo data in star entry:', starData)
        return null
      }

      return {
        nameWithOwner: repo.full_name || 'Unknown',
        url: repo.html_url || '#',
        stargazerCount: repo.stargazers_count || 0,
        description: repo.description || '',
        primaryLanguage: repo.language || null,
        starredAt: starData.starred_at || new Date().toISOString(),
      }
    })
    .filter(Boolean) // Remove any null entries
}


async function main() {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(CACHE_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Fetch both stars and language colors concurrently
    const [allStars, allLanguageColors] = await Promise.all([
      fetchAllStars(),
      fetchLanguageColors()
    ])
    
    const transformedStars = transformStarData(allStars)

    // Extract unique languages from the stars data
    const usedLanguages = new Set()
    transformedStars.forEach(star => {
      if (star.primaryLanguage) {
        usedLanguages.add(star.primaryLanguage)
      }
    })

    // Build colors object with only the languages we actually use
    const colours = {}
    usedLanguages.forEach(language => {
      if (allLanguageColors[language] && allLanguageColors[language].color) {
        colours[language] = allLanguageColors[language].color
      }
    })

    console.log(`Using colors for ${Object.keys(colours).length} languages out of ${usedLanguages.size} total languages`)

    const cacheData = {
      colours: colours,
      totalCount: transformedStars.length,
      fetchedAt: new Date().toISOString(),
      perPage: PER_PAGE,
      stars: transformedStars,
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2))

    console.log(
      `Successfully cached ${transformedStars.length} starred repositories to ${CACHE_FILE}`
    )
    console.log(
      `Total pages needed for pagination: ${Math.ceil(transformedStars.length / PER_PAGE)}`
    )
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()
