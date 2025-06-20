import * as React from 'react'

import Giscus from '@giscus/react'

const id = 'inject-comments'

const Comments = () => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Allows
  if (!mounted) return null

  return (
    <div id={id}>
      <Giscus
        id={id}
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
        strict="0"
        theme="noborder_dark"
      />
    </div>
  )
}

export default Comments
