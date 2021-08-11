module Twist
  module Web
    module Controllers
      module Oauth
        class Callback < Hanami::Action
          include Hanami::Action::Session
          include Twist::Import[
            "repositories.user_repo",
            github_info: "transactions.users.github_info",
            oauth_client: "oauth.client",
            create_user: "transactions.users.create",
            find_by_github_login: "transactions.users.find_by_github_login",
            generate_jwt: "transactions.users.generate_jwt",
          ]
          include Web::Controllers::CORS

          def handle(req, res)
            # TODO!
            # raise "states do not match" if session[:state] != params[:state]
            res.format = :json

            token = get_oauth_token(req.params[:code], req.session[:state])

            if token.params.key?("error")
              res.status = 401
              res.body = token.params.to_json
              return
            end

            gh_info = github_info.(token: token.token)

            user = find_by_github_login.(gh_info[:login])

            user ||= begin
              result = create_user.(
                email: gh_info[:email],
                password: SecureRandom.hex(64),
                name: gh_info[:name],
                github_login: gh_info[:login],
              )
              result.success
            end

            jwt_token = generate_jwt.(email: user.email).success

            res.format = :json
            res.status = 200
            res.body = {
              jwt_token: jwt_token,
            }.to_json
          end

          private

          def get_oauth_token(code, state)
            oauth_client.auth_code.get_token(
              code,
              redirect_uri: "#{ENV.fetch('FRONTEND_APP_URL')}/oauth/callback",
              state: state,
            )
          end
        end
      end
    end
  end
end
