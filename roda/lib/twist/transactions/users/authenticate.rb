module Web
  module Transactions
    module Users
      class Authenticate
        include Dry::Transaction
        include Twist::Import["user_repo"]

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
          generate_jwt = GenerateJWT.new
          token = generate_jwt.(email: user.email)

          Success(email: user.email, token: token)
        end
      end
    end
  end
end
