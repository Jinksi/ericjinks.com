---
title: Creating static websites with React, Part 1
excerpt: Let's create a lightning-fast, offline-first static website with React
date: 2017-10-10T09:00:00+10:00
---

_Why static?_  
Creating a static website will offer improved performance, higher security, lower
cost of hosting & scaling, and a better developer experience.

_Why React?_  
You may have looked at a couple of [static site generators](https://www.staticgen.com/)
and become a victim of [overchoice](Overchoice). You already know or wish to learn
JavaScript and use it rather than a new templating language.

I'll show you the basics of how I create a static website using React.

## What will we be creating?

We are going to create a basic site that is lightning-fast, works offline, works
without JavaScript and can be deployed on a CDN. It can be used as a framework
for future projects, kinda like a static-site generator. We'll be using
open-source React components/libraries to get us there.

See the result at: <https://react-static-site.netlify.com>.  
If you want to see the resulting code, [check out the Github repo](https://github.com/Jinksi/react-static-site).  
I also have a more complete, opinionated framework which I use called
[HyperStatic](https://github.com/Jinksi/hyperstatic)

## What we will use to achieve this

- [Create-React-App](https://github.com/facebookincubator/create-react-app)

  This is a great start for any React project, allowing us to get stuck into
  writing code quickly, without having to install or configure build tools.

- [Styled Components](https://www.styled-components.com/)

  I highly recommend using this CSS-in-JS solution for React. Allows us to write
  our CSS in our React components using Sass-style syntax.

- [React-Router](https://github.com/ReactTraining/react-router)

  We'll use this to create our routes, enabling site navigation with urls, like
  a normal website 😅.

- [React-Helmet](https://github.com/nfl/react-helmet)

  A simple way of updating our sites `<head>`. Think `<title>` and meta tags.

- [React-Snapshot](https://github.com/geelen/react-snapshot)

  To pre-render our app out to static html, allowing JavaScript-less support and
  making our site feel extra speedy. This is our version of a static-site
  generator.

## Walkthrough

### Pre-requisites

You need to have Node >= 6 installed on your machine.

### Create-react-app

If you don't already have it, install
[`create-react-app`](https://github.com/facebookincubator/create-react-app)
globally with npm.

```
npm install -g create-react-app
```

Once this has finished installing, we'll create our new project into a folder
called `react-static-site`.

```
create-react-app react-static-site
cd react-static-site
npm start
```

Our app is now running in development mode and we can see it in our browser at
[localhost:3000](http://localhost:3000).

Open the project folder in your favourite editor. Have a look in the `src`
folder. `App.js` is the base component of our app. Let's delete the files
`src/logo.svg` and `src/App.css`. Then we will remove the imports from the top
of `App.js` and replace the markup in the `render` function:

```jsx
// src/App.js
import React, { Component } from 'react'

class App extends Component {
  render() {
    return <div>Hello World!</div>
  }
}

export default App
```

Cool! We have a blank slate, let's create our home page.

### Creating a page

Let's create a new folder to keep our page templates: `src/views/`. In this
folder, create `Home.js`.

```jsx
// src/views/Home.js
import React from 'react'
import PageHeader from '../components/PageHeader'

const Home = props => (
  <div>
    <PageHeader>
      <h1>Home Page</h1>
    </PageHeader>
    <p>This site is built with React!</p>
  </div>
)

export default Home
```

This is a simple functional react component that returns markup for our home
page. Let's import this into `src/App.js` and render it.

```jsx
// src/App.js
import React, { Component } from 'react'
import Home from './views/Home'

class App extends Component {
  render() {
    return <Home />
  }
}

export default App
```

### Adding style with styled-components

Open your project folder in terminal and install `styled-components`.

`npm install styled-components`

Let's create a new folder, `src/components/`, which will hold our styled
components. In this folder, we'll create our first component file,
`PageHeader.js`.

```jsx
// src/components/PageHeader.js
import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  background: linear-gradient(45deg, aquamarine, aqua);
  padding: 1rem 2rem;
`

const Title = styled.h1`
  font-weight: 300;
`

const PageHeader = props => (
  <Header>
    <Title>{props.title}</Title>
  </Header>
)

export default PageHeader
```

As you can see, we are writing css inside our component file. The `Header`
styled-component will return a `div` with it's respective css applied to it.
`Title` will return a `h1` element with it's own css. The `PageHeader` component
will take a `title` prop and render our `Title` component nested inside
`Header`.

Let's import our `PageHeader` component into our home page:

```jsx
// src/views/Home.js
import React from 'react'
import PageHeader from '../components/PageHeader'

const Home = props => (
  <div>
    <PageHeader title="Home Page" />
    <p>This site is built with React!</p>
  </div>
)

export default Home
```

We now see our `<PageHeader />` rendered on our home page!

![PageHeader](/images/uploads/PageHeader.png)

Let's add another component to hold the page content,
`src/components/PageContent.js`:

```jsx
// src/components/PageContent.js
import styled from 'styled-components'

const PageContent = styled.div`
  width: 95%;
  max-width: 600px;
  padding: 2rem;
`

export default PageContent
```

Now we'll add it to the home page like we did with `<PageHeader />`, adding some
placeholder content:

```jsx
// src/views/Home.js
import React from 'react'
import PageHeader from '../components/PageHeader'
import PageContent from '../components/PageContent'

const Home = props => (
  <div>
    <PageHeader title="Home Page" />
    <PageContent>
      <p>This site is built with React!</p>
      <p>
        This is placeholder text that our web designers put here to make sure
        words appear properly on your website. This text is going to be replaced
        once the website is completed. You are currently reading text that is
        written in English, not any other language. Be careful not to waste too
        much time reading placeholder text! This text isn’t going to remain here
        because it doesn't pertain to the website.
      </p>
    </PageContent>
  </div>
)

export default Home
```

Awesome, our home page is starting to look the part with our styled components.
Let's look at adding navigating to our site. Firstly, we will create a new page,
`src/views/About.js`:

```jsx
// src/views/About.js
import React from 'react'
import PageHeader from '../components/PageHeader'
import PageContent from '../components/PageContent'

const About = props => (
  <div>
    <PageHeader title="About Page" />
    <PageContent>
      <p>Welcome to the About Page!</p>
      <img
        src="https://source.unsplash.com/xotmnyN3gdc/200x200"
        alt="Photo by Isabella Jusková"
      />
    </PageContent>
  </div>
)

export default About
```

### Navigating with react-router

It's time to install `react-router-dom`.

`npm install react-router-dom`

Let's open up `src/App.js` and we'll import the required components, then add
our routes.

```jsx
// src/App.js
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/about/" component={About} />
        </div>
      </Router>
    )
  }
}

export default App
```

Now if you open <http://localhost:3000/about/> in your browser, you will see the
about page! 🎉

OK, let's now a new component for our navigation, `src/components/Nav.js`

```jsx
// src/components/Nav.js
import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav = styled.nav`
  display: flex;
  padding: 2rem;

  a {
    margin-right: 1rem;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: inherit;

    &:hover,
    &.active {
      text-decoration: underline;
    }
  }
`

export default props => (
  <Nav>
    <NavLink exact to="/">
      Home
    </NavLink>
    <NavLink to="/about/">About</NavLink>
  </Nav>
)
```

As you can see, styled-components allows us to write css with sass-style
nesting. The `<NavLink />` component will add the `.active` className, allowing
us to add an active style.

Now let's add our new `<Nav />` component to `src/App.js`.

```jsx
// src/App.js
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import Nav from './components/Nav'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default App
```

Our site now has navigation and routes! 🎉

![React Router](/images/uploads/react-router.gif)

Now we need to update the document `<head>` when our routes change. For this
job, we use react-helmet.

### Managing the document head with react-helmet

Install `react-helmet`.

`npm install react-helmet`

React-helmet will take any html tags and update the `<head>` for us. We will
update the page `<title>` for our pages. Let's add `react-helmet` and a
`<title>` to a `src/views/Home.js`:

```jsx
// app/views/Home.js
import React from 'react'
import { Helmet } from 'react-helmet'
import PageHeader from '../components/PageHeader'
import PageContent from '../components/PageContent'

const Home = props => (
  <div>
    <Helmet>
      <title>This is the Home Page title!</title>
    </Helmet>
    <PageHeader title="Home Page" />
    <PageContent>
      <p>This site is built with React!</p>
      <p>
        This is placeholder text that our web designers put here to make sure
        words appear properly on your website. This text is going to be replaced
        once the website is completed. You are currently reading text that is
        written in English, not any other language. Be careful not to waste too
        much time reading placeholder text! This text isn’t going to remain here
        because it doesn't pertain to the website.
      </p>
    </PageContent>
  </div>
)

export default Home
```

Go ahead and do the same for `src/views/About.js`, with a unique `<title>`.

![react-helmet](/images/uploads/react-helmet.gif)

Ok, we are nearly there, time to render this whole thing out to static html!

### Rendering to html using react-snapshot

Let's install `react-snapshot`.

`npm install react-snapshot`

To begin, let's build out our site: `npm run build`. Once the build process has
completed, take a look inside the `build` folder. Unfortunately, we only have
one `index.html` file. We need more! We need one for each page! Also, we need
the `<title>` and html content of the page to output to these html files!

React-snapshot will crawl all of the links that it finds in our app, rendering
and saving html files as it goes. We only need to make a couple of changes to
our code for this to happen:

1.  `src/index.js`:

```jsx
import React from 'react'
// replace ReactDOM import with the following line:
import { render } from 'react-snapshot'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// replace ReactDOM render with react-snapshot render
render(<App />, document.getElementById('root'))
registerServiceWorker()
```

2.  `package.json`:

Change `build` script to `"react-scripts build && react-snapshot"`

3.  `public/index.html`

Remove the following `<noscript>` message:

```html
<noscript>
  You need to enable JavaScript to run this app.
</noscript>
```

That's it! Let's `npm run build` again then have a look inside the `build`
folder. We now have html files for each of our pages, complete with `<title>`
tags, content and css injected by our styled-components.

We can now upload this build folder to a CDN service like
[Netlify](https://netlify.com). Better yet, publish your project to Github, link
it with Netlify, which will run your build script and publish it when you update
the repo!

### What's next?

See the result at: <https://react-static-site.netlify.com>.

Click the button below to clone my example Github repo and deploy it
automagically on [Netlify](https://netlify.com). ✨

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Jinksi/react-static-site)

Check back soon, I will be demonstrating how we can use a headless CMS to manage
content for our static site.
