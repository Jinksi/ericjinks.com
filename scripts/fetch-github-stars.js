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
const CACHE_FILE = path.join(__dirname, '..', 'src', 'data', 'github-stars.json')

if (!GITHUB_TOKEN) {
  console.error('Error: GH_TOKEN environment variable is required')
  process.exit(1)
}

async function fetchPage(page) {
  const url = `https://api.github.com/user/starred?per_page=${PER_PAGE}&page=${page}&sort=created&direction=desc`
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      // Use star+json to include starred_at timestamp in response
      'Accept': 'application/vnd.github.star+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}: ${response.statusText} for page ${page}`)
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
    for (let i = 0; i < BATCH_SIZE && page <= 50; i++) { // Cap at 50 pages (5000 repos) for safety
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
      await new Promise(resolve => setTimeout(resolve, 200))
    } catch (error) {
      console.error(`Error fetching batch starting at page ${page}:`, error)
      process.exit(1)
    }
  }

  return allStars
}

function transformStarData(stars) {
  return stars.map(starData => {
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
      primaryLanguage: repo.language ? {
        name: repo.language,
        color: getLanguageColor(repo.language)
      } : null,
      starredAt: starData.starred_at || new Date().toISOString()
    }
  }).filter(Boolean) // Remove any null entries
}

// Simple language color mapping - can be expanded
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'C++': '#f34b7d',
    'C': '#555555',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Shell': '#89e051',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'Dart': '#00B4AB',
    'Vue': '#2c3e50',
    'React': '#61dafb'
  }
  return colors[language] || '#586069'
}

async function main() {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(CACHE_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    const allStars = await fetchAllStars()
    const transformedStars = transformStarData(allStars)
    
    const cacheData = {
      stars: transformedStars,
      totalCount: transformedStars.length,
      fetchedAt: new Date().toISOString(),
      perPage: PER_PAGE
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2))
    
    console.log(`Successfully cached ${transformedStars.length} starred repositories to ${CACHE_FILE}`)
    console.log(`Total pages needed for pagination: ${Math.ceil(transformedStars.length / PER_PAGE)}`)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()