require_relative "client"
require "twist_web/controllers/cors"

module Twist
  module Web
    module Controllers
      module Oauth
        class Callback
          include Hanami::Action
          include Twist::Import["user_repo"]
          include Web::Controllers::CORS
          include Client

          def call(params)
            # TODO!
            # raise "states do not match" if session[:state] != params[:state]
            self.format = :json

            token = get_oauth_token(params[:code])

            if token.params.key?("error")
              handle_oauth_callback_failure(token)
              return
            end


            github_client = build_github_client(token)
            github_user = github_client.user
            primary_email = github_client.emails.detect { |e| e[:primary] }[:email]

            user = user_repo.find_by_github_login(github_user.login)

            user ||= begin
              create_user = Transactions::Users::Create.new(
                user_repo: user_repo,
              )

              result = create_user.(
                email: primary_email,
                password: SecureRandom.hex(64),
                name: github_user.name,
                github_login: github_user.login,
              )
              result.success
            end

            generate_jwt = Transactions::Users::GenerateJWT.new

            jwt_token = generate_jwt.(email: user.email)

            self.format = :json
            self.body = {
              jwt_token: jwt_token,
            }.to_json
          end

          private

          def get_oauth_token(code)
            client.auth_code.get_token(
              code,
              redirect_uri: "#{ENV.fetch('FRONTEND_URL')}/oauth/callback",
              state: session[:state],
            )
          end

          def handle_oauth_callback_failure(token)
            self.status = 401
            self.body = token.params.to_json
          end

          def build_github_client(token)
            Octokit::Client.new(access_token: token.token)
          end
        end
      end
    end
  end
end
