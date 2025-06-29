require 'dry/system'
require 'pry'

module Twist
  class Container < Dry::System::Container
    configure do |config|
      config.root = Pathname(__dir__).join('..')
      config.component_dirs.add 'lib' do |dir|
        dir.namespaces.add "twist", key: nil
      end
    end
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

  Container.register 'logger', -> { Logger.new(STDOUT) }

  Import = Dry::AutoInject(Container)
end

loader = Zeitwerk::Loader.new
loader.inflector.inflect "graphql" => "GraphQL"
loader.inflector.inflect "cors" => "CORS"
loader.push_dir Twist::Container.config.root.join("lib").realpath
loader.setup
