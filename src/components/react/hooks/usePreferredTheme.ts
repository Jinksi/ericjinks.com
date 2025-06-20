import { useEffect, useState } from 'react'

/**
 * This hook is used to determine the preferred theme of the user.
 * Returns true if the user prefers dark mode, false otherwise.
 */
export const usePreferredTheme = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isDark
}
