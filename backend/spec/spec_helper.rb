# Require this file for unit tests
ENV['APP_ENV'] ||= 'test'

require_relative '../config/environment'
require 'rspec'
require 'database_cleaner'
require 'pry'

require 'sidekiq/testing'
Sidekiq::Testing.inline!

require_relative 'support/controller_authentication_helpers'

DatabaseCleaner.strategy = :truncation

RSpec.configure do |config|
  config.before { DatabaseCleaner.clean }

  config.before(:all) { Twist::Git.test = true }

  config.around(integration: true) do |example|
    Twist::Git.test = false
    example.run
    Twist::Git.test = true
  end

  config.include ControllerAuthenticationHelpers, uses_authentication: true
end
