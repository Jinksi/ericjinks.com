Create a new blog post with the following frontmatter:

```mdx
---
title: 'New post title'
pubDate: YYYY-MM-DD (today's date)
description: 'A short description of the post'
showDate: true
tags: tag1, tag2
isDraft: true
---

Write the post content here below the frontmatter.
```

Add the post to the `content/blog/year` directory, where `year` is the current year. The filename should be the post title in kebab case, `.mdx`.

Add a new React component file in the same directory. The component should be named `_component.tsx` and should include a hello world react component:

```tsx
import { useState } from 'react'

export default function PostComponent() {
  const [count, setCount] = useState<number>(0)
  return (
    <button
      onClick={() => setCount(count + 1)}
      className="border-2 border-highlight px-6 py-4 text-4xl font-bold"
    >
      Count is {count}
    </button>
  )
}
```

Add the component to the post content using the `import` statement:

```mdx
import PostComponent from './_component.tsx'

<PostComponent client:load />
```
