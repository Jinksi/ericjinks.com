---
title: 'Normalised Data Stores in React'
pubDate: 2025-06-30
description: 'Exploring how normalised data stores help us manage client-side state efficiently.'
showDate: true
tags: System design
isDraft: true
---

## Normalised Data Stores explained

Normalised data stores are a way to store data in a way that reduces duplication and makes it easier to update.

We store each entity of a data model once, and reference it by ID elsewhere.

```js
// Without normalised data stores, data is duplicates/nested

const user = {
  id: '1',
  name: 'John Doe',
}

const post = {
  id: '1',
  title: 'Hello World',
  author: {
    id: '1',
    name: 'John Doe',
  },
}
```

The problem is, if we want to update the author's name, we need to update it in both places.

```js
// If we want to update the author's name, we need to update it in both places

user.name = 'Jane Doe'
post.author.name = 'Jane Doe'
```

```js
// With normalised data stores, we store the relationship between entities, rather than the duplicated data

const user = {
  id: '1',
  name: 'John Doe',
}

const post = {
  id: '1',
  title: 'Hello World',
  // We store the author ID, not the author object
  authorId: '1',
}
```

Now, if the author's name changes, we can update it in one place.

```js
// If the author's name changes, we can update it in one place

user.name = 'Jane Doe'
```

## Why Normalise Client-Side Data?

**Eliminate duplication**: Store entities once, reference by ID elsewhere. If multiple posts share the same author, store author data once instead of duplicating across posts.

**Consistent updates**: When an entity changes (e.g., user updates their name), all UI references update automatically from the single source of truth.

## Real-world examples:

- **Facebook**: Relay normalises GraphQL responses using schema knowledge
- **Twitter**: Redux with normalised state structure ([reference](https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1))
