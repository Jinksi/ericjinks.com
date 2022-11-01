export function formatDate(date: string) {
  if (!date) return date
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date))
}
