## Backend

The backend application is a [Hanami](http://hanamirb.org/) application, which has the main job of
containing a GraphQL endpoint backed by some `Hanami::Repository` objects.

It has one other endpoint: `/books/:permalink/receive`. This endpoint is
designed to receive a [push event
payload](https://developer.github.com/v3/activity/events/types/#pushevent) from GitHub when a book's repository is pushed to. Once this endpoint receives the push request, it will process the book's content, loading it into the database. See `Web::Controllers::Books::Receive` for that particular entrypoint.

This application used to have more endpoints, but I deleted them when I realised that I could just use the `/graphql` endpoint for the frontend.

Once the book has been "received" by that particular endpoint, the book is processed by the `MarkdownBookWorker` -- a job ran by [Sidekiq](https://sidekiq.org/) -- using some hijinks that I've come up with to process Leanpub's special Markdown format. This job loads the book's data into the database, and then that data is presented through the GraphQL API to the frontend.

### Pre-requisites

* Ruby
* Redis
* PostgreSQL

### Setting up

#### Homebrew, libssh2 + openssl

One of the gem dependencies of this app is `rugged`. This talks over the Git protocol, and requires some additional packages. It requires `libssh2` (and its dependency, `openssl`) and `pkg-config` to be installed. It will also be necessary to configure `pkg-config` to point it at your `openssl` directory, because it has trouble finding it:

```
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/opt/openssl/lib/pkgconfig
```

Once that is done, proceed with the following setup.

#### Ruby dependencies

To setup the backend app, you can run:

```
bundle install
```

You will also need to create the database:

```
bundle exec hanami db prepare

HANAMI_ENV=test bundle exec hanami db prepare
```

Because this app uses [Shrine](https://shrinerb.com) for file uploads and because it is configured to use S3 by default, you will also need to find and put your AWS keys inside a file called `.aws_credentials`:

```
export AWS_ACCESS_KEY_ID=abc123123123
export AWS_SECRET_ACCESS_KEY=abc123
export AWS_BUCKET=twistimages-yourname-dev
export AWS_REGION=your-aws-region-goes-here
```

Then you can run the app using:

```
scripts/server
```

You can boot a console session by running:

```
scripts/console
```

And you can setup some initial data by running:

```
scripts/seed
```

This will setup a user and a book. The book will not be processed until Sidekiq is running, which you can do with:

```
scripts/sidekiq
```

