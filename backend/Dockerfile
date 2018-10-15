FROM ruby:latest

WORKDIR /myapp

RUN apt-get update
RUN apt-get install cmake -y

COPY Gemfile Gemfile.lock /myapp/
RUN gem update bundler

RUN bundle install

# Install Chrome
RUN apt-get install apt-transport-https -y
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt-get install google-chrome-stable -y

# Install ChromeDriver
RUN apt-get install unzip libnss3 libgconf-2-4 -y
RUN wget http://chromedriver.storage.googleapis.com/2.42/chromedriver_linux64.zip
RUN unzip chromedriver*
RUN mv chromedriver /usr/local/bin


COPY . /myapp


