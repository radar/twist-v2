ENV['APP_ENV'] ||= ENV['RACK_ENV'] || "development"

require "bundler"
Bundler.setup(ENV["APP_ENV"])

require 'dotenv'
Dotenv.load(".env", ".env.#{ENV["APP_ENV"]}")
