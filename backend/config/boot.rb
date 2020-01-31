ENV['APP_ENV'] ||= "development"

require "bundler"
Bundler.setup(ENV["APP_ENV"])

require 'dotenv'
p ENV['APP_ENV']
Dotenv.load(".env", ".env.#{ENV["APP_ENV"]}")
