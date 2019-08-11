---
title: Serverless R functions with Cloud Run
excerpt: Using serverless containers to deploy scalable R functions.
date: 2019-08-12
---

# Serverless R with Cloud Run

If you're a JavaScript developer, using [serverless functions](https://en.wikipedia.org/wiki/Serverless_computing) can be a great way to create auto-scaling, cost-effective APIs. [Any](https://www.netlify.com/products/functions/) [cloud](https://cloud.google.com/functions/) [provider](https://azure.microsoft.com/en-us/services/functions/) who can host serverless functions will support JS and probably has solid workflows, allowing you to write the code and simply `git push` to deploy.

If you're a developer working with [R](<https://en.wikipedia.org/wiki/R_(programming_language)>), you are not so lucky! R is not natively supported on any of the major serverless cloud providers (yet). Thankfully, there is a solution that is beginning to gain traction with cloud platforms called **Serverless Containers**.

Serverless containers enable us to write code in any language and with any dependencies or libraries. We bundle up our functions into [Docker](https://www.docker.com/resources/what-container) containers, deploy them and pay only when they are running. If the function is getting hit with a spike in traffic, more containers will be spun up instantaneously to handle the workload and deallocated again once the task is complete.

## Introduce specific problem

[Cloud Run](https://cloud.google.com/run/)

- Allow custom machine types including GPU

##

## Show solution

## Conclusiom
