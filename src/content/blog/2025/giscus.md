---
title: 'Use GitHub discussions for comments on your static Astro site/blog'
pubDate: 2025-06-21
description: Giscus is a commenting system that leverages GitHub discussions to provide an easy comment setup for your static site/blog.
showDate: true
tags: static-site, astro, react
---

I recently discovered that you can use GitHub discussions for hosting comments and reactions on your static site/blog using [giscus](https://giscus.app/).

_🙌 Thanks to [Thomas Ledoux for sharing](https://www.thomasledoux.be/blog/hosting-blog-comments-reactions-github-discussions) how to integrate Giscus into an Astro site._

It is super easy to set up.

1. Use a GitHub repo with Discussions enabled for hosting the comments and reactions. I'm using this site's repo for this, [jinksi/ericjinks.com](https://github.com/jinksi/ericjinks.com).
2. Visit [giscus](https://giscus.app/) and follow the instructions to authorise/configure and install the app to access your repo's discussions.
3. Install the [Giscus React component](https://github.com/giscus/giscus-component) and create a new React component in your Astro project with the values provided by giscus.

```tsx
import Giscus from '@giscus/react'

const Comments = () => {
  // Copy these values from the giscus.app configuration script
  return (
    <Giscus
      repo="owner/repo"
      repoId="[GISCUS_REPO_ID]"
      category="[GISCUS_CATEGORY]"
      categoryId="[GISCUS_CATEGORY_ID]"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      lang="en"
      loading="lazy"
      strict="0"
      theme="noborder_dark"
    />
  )
}

export default Comments
```

4. Add the Giscus React component to your post template.

Note the `client:only="react"` attribute. This is an Astro directive that ensures the component is only rendered on the client side, not static site generation or server side rendering.

```astro
<!-- This is the post template -->
<article>
  <slot />
</article>

<!-- Add the Giscus component to the bottom of the post template -->
<!-- client:only="react" is an Astro directive that ensures the component is only rendered on the client side, not static site generation or server side rendering -->
<PostComments client:only="react" />
```
