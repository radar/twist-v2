module Web
  module Transactions
    module Users
      class Authenticate
        include Dry::Transaction
        include Web::Import["user_repo"]

        step :find_by_email
        step :validate_password
        step :encode_token

        AUTHENTICATION_FAILED = "Invalid username or password.".freeze

        def find_by_email(email:, password:)
          user = user_repo.find_by_email(email)
          return Failure(AUTHENTICATION_FAILED) unless user

          Success(user: user, password: password)
        end

        def validate_password(user:, password:)
          return Failure(AUTHENTICATION_FAILED) unless user&.correct_password?(password)

          Success(user)
        end

        def encode_token(user)
          hmac_secret = ENV.fetch("AUTH_TOKEN_SECRET")
          payload = { email: user.email }
          token = JWT.encode payload, hmac_secret, 'HS256'

          Success(email: user.email, token: token)
        end
      end
    end
  end
end
