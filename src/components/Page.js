import React from 'react'
import { useTheme } from '../hooks'

const Page = props => {
  const { isDarkTheme } = useTheme()
  return (
    <div
      style={{
        background: isDarkTheme ? 'transparent' : 'var(--color-background)',
      }}
      {...props}
    />
  )
}

export default Page
