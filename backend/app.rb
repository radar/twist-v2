require 'dry/system/container'
require 'dry/auto_inject'

module Twist
  class Container < Dry::System::Container
    configure do |config|
      config.root = File.expand_path('.')
      config.default_namespace = 'twist'

      config.auto_register = 'lib'
    end

    load_paths!('lib')
  end

  Container.register 'oauth.client', -> {
    OAuth2::Client.new(
      ENV.fetch('OAUTH_CLIENT_ID'),
      ENV.fetch('OAUTH_CLIENT_SECRET'),
      authorize_url: '/login/oauth/authorize',
      token_url: '/login/oauth/access_token',
      site: 'https://github.com',
      raise_errors: false
    )
  }

  Import = Dry::AutoInject(Container)
end
