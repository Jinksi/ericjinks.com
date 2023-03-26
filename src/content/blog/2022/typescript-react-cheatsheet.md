---
title: 'React & TypeScript Cheatsheet'
pubDate: 2022-07-01
description: A quick reference for using TypeScript in a React project.
showDate: false
tags: TypeScript, React
---

This React & TypeScript Cheatsheet is a quick reference for using TypeScript in a React project. It covers essential aspects like declaring types, interfaces, and using generics in React components and using TypeScript with React hooks.

## Table of Contents

- [Basic Setup with Vite](#basic-setup-with-vite)
- [Types and Interfaces](#types-and-interfaces)
- [React Components](#react-components)
- [React Component Return Types](#react-component-return-types)
- [React Hooks](#react-hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useReducer](#usereducer)

---

## Basic Setup with Vite

First, create a new React project with TypeScript support using [Vite](https://vitejs.dev):

```bash
npm init vite my-app
```

When prompted, select the framework React and the variant TypeScript. Vite will install types for React, so you don't need to install additional type packages.

---

## Types and Interfaces

### When to use `type` vs `interface`

In TypeScript, both `type` and `interface` can define the shape of an object. In most cases either a `type` or an `interface` could be used and the choice usually comes down to personal preference or convention within a codebase.

Use `interface` to define the shape of your props:

```tsx
interface AppProps {
  title: string
  isLoading: boolean
}

const App: React.FC<AppProps> = ({ title, isLoading }) => {
  // ...
}
```

You can also use the `type` keyword:

```tsx
type AppProps = {
  title: string
  isLoading: boolean
}

const App: React.FC<AppProps> = ({ title, isLoading }) => {
  // ...
}
```

---

## React Components

### Function Component

```tsx
import React from 'react'

interface Props {
  message: string
}

const MyComponent: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>
}

export default MyComponent
```

### Class Component

```tsx
import React, { Component } from 'react'

interface Props {
  message: string
}

interface State {
  count: number
}

class MyComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  render() {
    return (
      <div>
        <div>{this.props.message}</div>
        <div>{this.state.count}</div>
      </div>
    )
  }
}

export default MyComponent
```

---

## React Component Return Types

### Function Components

For function components, use the `React.FC` (or `React.FunctionComponent`) type, which includes the return type and prop types:

```tsx
interface Props {
  message: string
}

const MyComponent: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>
}
```

Alternatively, you can define the return type explicitly using `React.ReactElement` or `JSX.Element`:

```tsx
const MyComponent = ({ message }: Props): React.ReactElement => {
  return <div>{message}</div>
}
```

```tsx
const MyComponent = ({ message }: Props): JSX.Element => {
  return <div>{message}</div>
}
```

Both `React.ReactElement` and `JSX.Element` can be used as return types for React components, and they're often interchangeable.

If you want some general guidelines to follow:

- Use `React.ReactElement` when you want to be explicit about the dependency on the React library, or if you're working with React-specific APIs or features.
- Use `JSX.Element` when you want a more generic return type that represents a JSX element, which could be useful if you're writing code that is meant to be library-agnostic or reusable across different JSX-based libraries.

### Class Components

For class components, extend the `React.Component` class with the prop types and state types, and define the return type for the render method using `React.ReactNode`:

```tsx
import React, { Component } from 'react'

interface Props {
  message: string
}

interface State {
  count: number
}

class MyComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        <div>{this.props.message}</div>
        <div>{this.state.count}</div>
      </div>
    )
  }
}

export default MyComponent
```

---

## React Hooks

### useState

```tsx
import React, { useState } from 'react'

interface Props {
  initialCount: number
}

const Counter: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState<number>(initialCount)

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

### useEffect

```tsx
import React, { useEffect, useState } from 'react'

interface Props {
  userId: number
}

interface User {
  id: number
  name: string
  // ...
}

const UserProfile: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Fetch user data and set user state
  }, [userId])

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
```

### useReducer

In this example, we will type a `useReducer` hook for a simple counter application.

First, define the action types and the state interface:

```ts
// Define the action types as a TypeScript enum
enum ActionType {
  Increment,
  Decrement,
  Reset,
}

// Define the state interface
interface State {
  count: number
}
```

Next, define the reducer function with typed action and state:

```ts
interface Action {
  type: ActionType
  payload?: any
}

const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Increment:
      return { count: state.count + 1 }
    case ActionType.Decrement:
      return { count: state.count - 1 }
    case ActionType.Reset:
      return { count: 0 }
    default:
      return state
  }
}
```

Finally, create a component that uses the `useReducer` hook with the typed reducer function:

```tsx
import React, { useReducer } from 'react'

const Counter: React.FC = () => {
  const initialState: State = { count: 0 }
  const [state, dispatch] = useReducer(counterReducer, initialState)

  return (
    <div>
      <button onClick={() => dispatch({ type: ActionType.Decrement })}>
        -
      </button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: ActionType.Increment })}>
        +
      </button>
      <button onClick={() => dispatch({ type: ActionType.Reset })}>
        Reset
      </button>
    </div>
  )
}

export default Counter
```
