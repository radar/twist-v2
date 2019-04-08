require 'bundler/setup'
require 'hanami/setup'
require 'hanami/model'
require "hanami/middleware/body_parser"


require_relative '../lib/books'
require_relative '../apps/web/application'
require_relative '../apps/anonymous/application'

Hanami.configure do
  middleware.use Hanami::Middleware::BodyParser, :json

  mount Anonymous::Application, at: '/anonymous'
  mount Web::Application, at: '/'

  model do
    ##
    # Database adapter
    #
    # Available options:
    #
    #  * SQL adapter
    #    adapter :sql, 'sqlite://db/books_development.sqlite3'
    #    adapter :sql, 'postgresql://localhost/books_development'
    #    adapter :sql, 'mysql://localhost/books_development'
    #
    adapter :sql, ENV.fetch('DATABASE_URL')

    ##
    # Migrations
    #
    migrations 'db/migrations'
    schema     'db/schema.sql'
  end

  mailer do
    root 'lib/books/mailers'

    # See http://hanamirb.org/guides/mailers/delivery
    delivery :test
  end

  environment :development do
    # See: http://hanamirb.org/guides/projects/logging
    logger level: :debug
  end

  environment :test do
    # See: http://hanamirb.org/guides/projects/logging
    logger level: :debug if ENV['VERBOSE']
  end

  environment :production do
    logger level: :info, formatter: :json, filter: []

    mailer do
      delivery :smtp, address: ENV.fetch('SMTP_HOST'), port: ENV.fetch('SMTP_PORT')
    end
  end
end
