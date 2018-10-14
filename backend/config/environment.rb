require 'bundler/setup'
require 'hanami/setup'
require 'twist/core'

require_relative '../apps/web/application'

Hanami.configure do
  Twist::Core.configure_model(self)

  mount Web::Application, at: '/'

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
