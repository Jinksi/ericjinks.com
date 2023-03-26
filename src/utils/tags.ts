export const formatTagUrlSafe = (tag: string) =>
  tag
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')

export const formatTag = (tag: string) =>
  tag.toLocaleLowerCase().trim().replace(/\s/g, '-')
