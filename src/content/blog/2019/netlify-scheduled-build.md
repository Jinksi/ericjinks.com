---
title: Schedule your Netlify build with GitHub Actions
description: If your build process is pulling in content from third-party services (e.g. Instagram, Youtube), scheduling a daily build & deploy can be an easy way to keep this content fresh.
pubDate: 2019-08-16
tags: CI/CD
---

If you host a site on Netlify, you may know about [Build Hooks](https://www.netlify.com/docs/webhooks/#incoming-webhooks). By creating a build hook and sending a `POST` request to it, you trigger a new build & deploy for your site. If your build process is pulling in content from third-party services (e.g. Instagram, Youtube), scheduling a daily build & deploy can be an easy way to keep this content fresh.

The easiest way to setup a scheduled build hook trigger that I have come across is to use [GitHub Actions](https://github.com/features/actions). Setting this up is completely free if your repository if public. If your repository if private, you will most likely remain in their free tier, see pricing [here](https://github.com/features/actions).

## Creating a scheduled Netlify build trigger GitHub Action

1. Add a Build hook to your site using the [Netlify Dashboard](https://app.netlify.com)

   > (Settings > Build & Deploy > Continuous Deployment > Build hooks)

2. In your GitHub repo, create a `main.yml` file in a `.github/workflows` directory:

   ```yaml
   # .github/workflows/main.yml

   name: Trigger Netlify Build
   on:
     schedule:
       # Run at 0815 daily
       - cron: '15 8 * * *'
   jobs:
     build:
       name: Request Netlify Webhook
       runs-on: ubuntu-latest
       steps:
         - name: Curl request
           run: curl -X POST -d {} YOUR_BUILD_HOOK
   ```

   > Replace **YOUR_BUILD_HOOK** with the build hook url you just created.
   > You can use [crontab.guru](https://crontab.guru) to easily generate your cron schedule.

3. Open the Actions tab in you GitHub repo to watch the workflow trigger as per your cron schedule. 🎉

I hope this is useful to you! If you have any questions, I've created an example repository that uses GitHub Actions to build every 15mins: [github.com/Jinksi/netlify-build-github-actions](https://github.com/Jinksi/netlify-build-github-actions). Feel free to open an issue there or send me a message on [twitter](https://twitter.com/Jinksi).
