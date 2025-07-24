import starsData from '../data/github-stars.json'

export function getMostRecentStarYear(): number {
  const { stars } = starsData
  const years = [...new Set(stars.map(star => new Date(star.starredAt).getFullYear()))].sort((a, b) => b - a)
  return years[0]
}