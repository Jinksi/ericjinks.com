---
title: Serverless R functions with Cloud Run
excerpt: Using serverless containers to deploy scalable R functions.
date: 2019-09-2
---

# Serverless R with Cloud Run

> [Cloud Run with R – Hello World (GitHub)](https://github.com/Jinksi/cloudrun-helloworld-r)

If you're a JavaScript developer, using [serverless functions](https://en.wikipedia.org/wiki/Serverless_computing) can be a great way to create auto-scaling, cost-effective APIs. [Any](https://www.netlify.com/products/functions/) [cloud](https://cloud.google.com/functions/) [provider](https://azure.microsoft.com/en-us/services/functions/) who can host serverless functions will support JS and probably has solid workflows, allowing you to write the code and simply `git push` to deploy.

If you're a developer or data scientist working with [R](<https://en.wikipedia.org/wiki/R_(programming_language)>), you are not so lucky! R is not natively supported on any of the major serverless cloud providers (yet). Thankfully, there is a solution that is beginning to gain traction with cloud platforms called **Serverless Containers**. I am using [Google Cloud Run](https://cloud.run/) to host and manage serverless containers. Cloud Run provides a genorous 'free tier' so you can try it out without cost. It can be extended to utilise custom machine types, including GPU support, which can be critical if you are running Machine Learning tasks.

Serverless containers enable us to write code in any language and with any dependencies or libraries. We bundle up our functions into [Docker](https://www.docker.com/resources/what-container) containers, deploy them and pay only when they are running. If the function is getting hit with a spike in traffic, more containers will be spun up instantaneously to handle the workload and deallocated again once the task is complete.

## R on the backend

In my case, I was using R to generate geospatial map data that would be rendered using a frontend React web app. I used the R library [`plumber`](https://www.rplumber.io) to create a REST API, exposing https endpoints handled by functions defined in `app.R`.

To define endpoints with `plumber`, parameters are defined by decorating R functions with special comments.

The function below will accept `POST` requests with `lat` and `lon` data, returning geojson data:

```R
# app.R

library(geojsonio)

#' Generates geojson containing 70 points surrounding central coordinate
#' @param lat latitude of central coordinate
#' @param lon longitude of central coordinate
#' @post /geojson
function(lat, lon){
  lat <- as.numeric(lat)
  lon <- as.numeric(lon)
  maxRange <- 0.1
  n <- 70

  # Generate data
  df <- data.frame(
    lat = runif(n, min = lat - maxRange, max = lat + maxRange),
    lon = runif(n, min = lon - maxRange, max = lon + maxRange),
    magnitude = runif(n, min = 0, max = 1)
  )

  # create geojson string from dataframe
  geojsonString <- geojson_json(df)

  # data to return
  geojsonString
}

print('app.R running')
```

`server.R` sets up the server to listen on a specific port. This also enables a [Swagger](https://swagger.io) interface for exploring the REST API.

```R
# server.R

library(plumber)
# 'app.R' is the location of the file containing your endpoint functions
r <- plumb("app.R")
# get port number from environment variable
port <- strtoi(Sys.getenv("PORT"))
r$run(port=port, host='0.0.0.0', swagger=TRUE)
```

## Defining a Docker container

A `Dockerfile` is used to define the Docker container requirements, install R libraries and start our server script.

```Dockerfile
# Use the official R image
# https://hub.docker.com/_/r-base
FROM r-base

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy local code to the container image.
COPY . .

# Install any R packages
RUN Rscript -e "install.packages('plumber')"

EXPOSE 8080

# Run the web service on container startup.
CMD [ "Rscript", "server.R"]
```

If you have Docker installed locally, you can build and run this container using the following commands:

- Build: `docker build . -t 'cloudrun-r-helloworld'`
- Run: `docker run -p 8080:8080 -e PORT=8080 cloudrun-r-helloworld`

## Deploying to Cloud Run

Now that we have out Docker container ready to go, let's deploy our container to Cloud Run.
There are a couple of ways we can do this, the [Cloud Run Docs](https://cloud.google.com/run/docs/quickstarts/build-and-deploy) explains the manual way to deploy. To summarise, we tell Cloud Build to build the docker image and push it to Container Registry, then use this image to deploy a new revision to Cloud Run.

If you want to get a clone of my hello world example deployed on Cloud Run quickly, click this Cloud Run Button:

[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=https://github.com/Jinksi/cloudrun-helloworld-r.git)

> Take a look at the [Cloud Run Button repo](https://github.com/GoogleCloudPlatform/cloud-run-button) to create your own.

## Continuous deployment with `git push`

Rather than manually deploying, I prefer to commit my changes to a Git repository and let deployment happen _automagically_.

We can use Google's [Cloud Build](https://cloud.google.com/cloud-build/) to automate the deployment of our container each time we push to a git repo. You will need to have your code in a `git repo` hosted on Github or another cloud git repository.

> If you are running this for the first time, you may have to enable GCP Billing and APIs. See the [Cloud Run Docs](https://cloud.google.com/run/docs/continuous-deployment)

To use Cloud Build we create a `cloudbuild.yaml` file and commit it to the repository root folder.

```yaml
# cloudbuild.yaml

# Replace $PROJECT_ID with your GCP project ID
# Replace [SERVICE-NAME] with the desired Cloud Run service name (e.g. hello-world)
# Replace [REGION] with the GCP region you are deploying to (e.g. asia-northeast1)

steps:
  # build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/[SERVICE-NAME]', '.']
    # push the container image to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/[SERVICE-NAME]']
    # Deploy container image to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      [
        'beta',
        'run',
        'deploy',
        '[SERVICE-NAME]',
        '--image',
        'gcr.io/$PROJECT_ID/[SERVICE-NAME]',
        '--region',
        '[REGION]',
        '--platform',
        'managed',
        '--quiet',
      ]
images:
  - gcr.io/$PROJECT_ID/[SERVICE-NAME]
```

Now to create a Cloud Build trigger:

1. Go to the [Cloud Build triggers page](https://console.cloud.google.com/cloud-build/triggers)
1. Click **Create Trigger**
1. Select your repository
1. Select `cloudbuild.yaml` in _Build Configuration_
1. Click **Create**
1. Push a change to your repository
1. Monitor build progress in the [Cloud Build console](https://console.cloud.google.com/cloud-build/builds)

Once this is setup, anytime you push to this repository, Cloud Build will build the Docker container and deploy a new revision to Cloud Run 🎉

[Read more in the Cloud Run docs](https://cloud.google.com/run/docs/continuous-deployment).

## Hello Cloud Run

Now that we have deployed our container to Cloud Run, we can sit back and be confident that our R functions will _just work_ without having to manage servers, load balancing, etc. 🏖

In the [Cloud Run console](https://console.cloud.google.com/run), we can map our service to a custom domain, increase service memory allocation, view logs and usage stats, etc. Cloud Run also offers a generous [Free Tier](https://cloud.google.com/run/pricing) for each month.

Thanks for reading! I hope I've helped to show you how to get started running serverless R in Cloud Run. Let me know if you found this post useful or have any questions, and feel free to share it!

## More info:

- [Cloud Run with R – Hello World (GitHub)](https://github.com/Jinksi/cloudrun-helloworld-r)
- [Cloud Run docs](https://cloud.google.com/run/docs/continuous-deployment)
- [plumber](https://www.rplumber.io)
