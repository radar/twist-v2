require 'dry/system/container'
require 'dry/auto_inject'
require 'dry/system/loader/autoloading'
require 'zeitwerk'
require 'pry'

module Twist
  class Container < Dry::System::Container
    config.root = __dir__

    config.component_dirs.loader = Dry::System::Loader::Autoloading
    config.component_dirs.add_to_load_path = false
    config.component_dirs.default_namespace = 'twist'

    config.component_dirs.add "lib" do |dir|
      dir.auto_register = true
      dir.default_namespace = 'twist'
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
