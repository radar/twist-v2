# Require this file for unit tests
ENV['HANAMI_ENV'] ||= 'test'

require_relative '../config/environment'
require 'rspec'
require 'database_cleaner'

Hanami.boot

DatabaseCleaner.strategy = :truncation

RSpec.configure do |config|
  config.before { DatabaseCleaner.clean }

  config.before(:all) { Git.test = true }

  config.around(integration: true) do |example|
    Git.test = false
    example.run
    Git.test = true
  end
end
