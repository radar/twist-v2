FROM ruby:latest

COPY . /myapp
WORKDIR /myapp

RUN apt-get update
RUN apt-get install cmake -y
RUN gem update bundler

RUN bundle install


RUN scripts/server


