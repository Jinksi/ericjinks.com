import starsData from '../data/github-stars.json'

export function getMostRecentStarYear(): number {
  const { stars } = starsData
  const getYearFromStarredAt = (star: { starredAt: string }) =>
    new Date(star.starredAt).getFullYear()
  const years = [...new Set(stars.map(getYearFromStarredAt))].sort(
    (a, b) => b - a
  )
  return years[0]
}
