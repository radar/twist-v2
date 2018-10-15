module Web
  module GraphQL
    module Mutations
      module User
        class Authenticate
          Result = Struct.new(:token, :email, :error)

          def call(user_repo, email:, password:)
            user = user_repo.find_by_email(email)

            error = Result.new(nil, nil, "Invalid username or password.")
            return error unless user&.correct_password?(password)

            hmac_secret = ENV.fetch("AUTH_TOKEN_SECRET")
            payload = { email: user.email }
            token = JWT.encode payload, hmac_secret, 'HS256'

            Result.new(token, user.email, nil)
          end
        end
      end
    end
  end
end
