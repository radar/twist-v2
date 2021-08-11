require "oauth2"

module Twist
  module Web
    module Controllers
      module Oauth
        class Authorize < Hanami::Action
          include Import["oauth.client"]
          include Hanami::Action::Session
          include Web::Controllers::CORS

          def handle(req, res)
            res.session[:state] = SecureRandom.hex(16)

            authorize_url = client.auth_code.authorize_url(
              redirect_uri: req.params[:redirect_uri],
              state: res.session[:state],
              scope: "user:email",
            )

            res.format = :json
            res.body = {
              github_authorize_url: authorize_url,
            }.to_json
          end
        end
      end
    end
  end
end
