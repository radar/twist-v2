require_relative "client"

module Users::Controllers::Oauth
  class Authorize
    include Users::Action
    include Controllers::CORS
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
