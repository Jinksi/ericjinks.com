import { useEffect } from 'react'
import createPersistedState from 'use-persisted-state'
import { isSSR } from './utils'

const useThemeState = createPersistedState('theme')

const themes = ['dark', 'light']

export const useTheme = () => {
  const getPreferredTheme = () => {
    if (
      !isSSR &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  const [theme, setTheme] = useThemeState(getPreferredTheme())

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  useEffect(() => {
    if (themes.includes(theme)) {
      document.body.dataset.theme = theme
    }
  }, [theme])

  const toggleTheme = () => setTheme(nextTheme)

  return { theme, toggleTheme }
}
