FROM ruby:2.7

COPY . /app
WORKDIR /app

RUN apt-get update
RUN apt-get install -y cmake openssl libgit2-27 libssh-dev postgresql-client

RUN gem install bundler -v 2.1.4
RUN bundle install
RUN bundle exec ruby -e 'require "rugged"; p Rugged.features'

ENTRYPOINT /bin/bash
