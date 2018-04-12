# Twist (v2)

This is an attempt to rewrite my [Rails-based book review
app](https://github.com/radar/twist) in Hanami, GraphQL, React, Apollo, Flow and whatever other Cool Hipster Tech™ I can get my grubby hands on.

It is a work-in-progress and quite experimental.

My goal is to have this fully developed enough so that I can use it for
reviewing my [Leanpub books](https://leanpub.com/u/ryanbigg).

# Structure / Philosophy

My philosophy for developing this app revolves around separating two main parts of the codebase:

1. The backend: retrieves data from data sources (GitHub / the database), and presents it for frontend consumption
2. The frontend: retrieves data from the Backend, has no idea where it came from, and presents it to the user

I'm hoping with this app to demonstrate that it _is_ possible to separate these two layers into two separate applications. My mental map of data flow within the application goes something like this:

```
DB <-> Backend Repositories <-> Backend GraphQL endpoint <-> Frontend <-> Browser
```

I want to demonstrate with this app that it's possible to build a frontend that only has knowledge of how to find data, not how it is constructed. In this app, the `frontend` component knows only that it can find data at `/graphql`. It has no knowledge at all about how the backend collects that data for presentation.

I want to also demonstrate that it's possible to build a backend app that is data-store agnostic. With the use of the [Repository Pattern](https://msdn.microsoft.com/en-us/library/ff649690.aspx), the backend application knows only that it can talk to the repositories to collect the data. The backend application knows _nothing_ about how that data is collected. Today, the repositories talk to a PostgreSQL database, but tomorrow it could just as easily be a Redis store and (assuming the data returned is the same), the backend app wouldn't know the difference.

## Backend

The backend application is a [Hanami](http://hanamirb.org/) application, which has the main job of
containing a GraphQL endpoint backed by some `Hanami::Repository` objects.

It has one other endpoint: `/books/:permalink/receive`. This endpoint is
designed to receive a [push event
payload](https://developer.github.com/v3/activity/events/types/#pushevent) from GitHub when a book's repository is pushed to. Once this endpoint receives the push request, it will process the book's content, loading it into the database. See `Web::Controllers::Books::Receive` for that particular entrypoint.

This application used to have more endpoints, but I deleted them when I realised that I could just use the `/graphql` endpoint for the frontend.

Once the book has been "received" by that particular endpoint, the book is processed by the `MarkdownBookWorker` -- a job ran by [Sidekiq](https://sidekiq.org/) -- using some hijinks that I've come up with to process Leanpub's special Markdown format. This job loads the book's data into the database, and then that data is presented through the GraphQL API to the frontend.

### Setting up

To setup the backend app, you can run:

```
bundle install
```

You will also need to create the database:

```
bundle exec hanami db prepare

HANAMI_ENV=test bundle exec hanami db prepare
```

Then you can run the app using:

```
bundle exec hanami server
```

## Frontend

The frontend application is a [React](https://reactjs.org/) + [React Router](https://reacttraining.com/react-router/core/guides/philosophy) + [Apollo](https://www.apollographql.com/docs/react/) JavaScript application, that uses Flow, ESLint, Babel, etc. Check out `package.json`.

This application originated from a `create-react-app` project that I ejected from as I needed more customisations than `create-react-app` could provide me -- like Sass support. I _cannot_ code CSS (and enjoy myself) without Sass.

### Setting up

To setup the frontend app, you can run:

```
yarn install
```

Then you can run this app by running:

```
yarn start
```

