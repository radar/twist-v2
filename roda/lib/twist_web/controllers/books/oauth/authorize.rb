require "oauth2"
require_relative "client"

require_relative "../../cors"

module Twist
  module Web
    module Controllers
      module Oauth
        class Authorize
          include Hanami::Action
          include Hanami::Action::Session
          include Web::Controllers::CORS
          include Client

          def call(params)

            session[:state] = SecureRandom.hex(16)

            authorize_url = client.auth_code.authorize_url(
              redirect_uri: params[:redirect_uri],
              state: session[:state],
              scope: "user:email",
            )

            self.format = :json
            self.body = {
              github_authorize_url: authorize_url,
            }.to_json
          end
        end
      end
    end
  end
end
