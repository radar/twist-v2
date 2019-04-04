require "oauth2"
require_relative "client"

module Web::Controllers::Oauth
  class Authorize
    include Web::Action
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
