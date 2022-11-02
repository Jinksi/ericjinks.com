export const formatTagUrlSafe = (tag: string) =>
  tag
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
