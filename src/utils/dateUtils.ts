export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date))
}
