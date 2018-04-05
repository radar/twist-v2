# Twist (v2)

This is an attempt to rewrite my [Rails-based book review
app](https://github.com/radar/twist) in Hanami, GraphQL, React, Apollo, Flow and whatever other Cool Hipster Tech™ I can get my grubby hands on.

It is a work-in-progress and quite experimental.

My goal is to have this fully developed enough so that I can use it for
reviewing my [Leanpub books](https://leanpub.com/u/ryanbigg).

# Structure

The application is split into two main parts: the backend and the frontend. This
is an intentional design decision.

## Backend

The backend application is a [Hanami](http://hanamirb.org/) application, which has the main job of
containing a GraphQL endpoint backed by some `Hanami::Repository` objects.

It has one other endpoint: `/books/:permalink/receive`. This endpoint is
designed to receive a [push event
payload](https://developer.github.com/v3/activity/events/types/#pushevent) from GitHub when a book's repository is pushed to. Once this endpoint receives the push request, it will process the book's content, loading it into the database. See `Web::Controllers::Books::Receive` for that particular entrypoint.

This application used to have more endpoints, but I deleted them when I realised that I could just use the `/graphql` endpoint for the frontend.

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

The frontend application is a [React](https://reactjs.org/) + [Apollo](https://www.apollographql.com/docs/react/) JavaScript application, that uses Flow, ESLint, Babel, etc. Check out `package.json`.

This application originated from a `create-react-app` project that I ejected from as I needed more customisations than `create-react-app` could provide me -- like Sass support.

### Setting up

To setup the frontend app, you can run:

```
yarn install
```

Then you can run this app by running:

```
yarn start
```

