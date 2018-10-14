require "bundler/setup"
require "twist/core"

RSpec.configure do |config|
  # Enable flags like --only-failures and --next-failure
  config.example_status_persistence_file_path = ".rspec_status"

  # Disable RSpec exposing methods globally on `Module` and `main`
  config.disable_monkey_patching!

  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
end

Hanami::Model.configure do
  adapter :sql, 'postgres://localhost/twist_test'

  migrations 'db/migrations'
  schema     'db/schema.sql'
end

Hanami::Model.load!
