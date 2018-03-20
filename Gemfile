source 'https://rubygems.org'

gem 'rake'
gem 'hanami',       '1.2.0.beta1'
gem 'hanami-model', '1.2.0.beta1'

gem 'pg'

gem 'bcrypt'
gem 'warden'

gem 'dry-transaction'

gem 'sidekiq'

gem 'rugged'
gem 'redcarpet'
gem 'pygments.rb'
gem 'nokogiri'

gem 'shrine'

gem 'rollbar'

gem 'babosa'

group :development do
  # Code reloading
  # See: http://hanamirb.org/guides/projects/code-reloading
  gem 'shotgun'

  gem 'hanami-webconsole'

  gem 'rubocop'
end

group :test, :development do
  gem 'sass'
  gem 'dotenv', '~> 2.0'
  gem 'pry'
end

group :test do
  gem 'rspec'
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
end

group :production do
  # gem 'puma'
end
