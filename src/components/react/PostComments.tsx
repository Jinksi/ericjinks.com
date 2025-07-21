import Giscus from '@giscus/react'

import { usePreferredTheme } from './hooks/usePreferredTheme'

const Comments = () => {
  const isDark = usePreferredTheme()

  return (
    <div className="w-full">
      <Giscus
        repo="jinksi/ericjinks.com"
        repoId="MDEwOlJlcG9zaXRvcnk5MTI3NjE2MA=="
        category="Announcements"
        categoryId="DIC_kwDOBXDDgM4Crvau"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        lang="en"
        loading="lazy"
        strict="1"
        theme={isDark ? 'noborder_dark' : 'light'}
      />
    </div>
  )
}

export default Comments
