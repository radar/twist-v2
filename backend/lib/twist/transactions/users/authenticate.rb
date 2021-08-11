module Twist
  module Transactions
    module Users
      class Authenticate < Transaction
        include Twist::Import["repositories.user_repo", "transactions.users.generate_jwt"]

        def call(email:, password:)
          user = yield find_by_email(email: email)
          yield validate_password(user: user, password: password)
          encode_token(user)
        end

        AUTHENTICATION_FAILED = "Invalid username or password.".freeze

        def find_by_email(email:)
          user = user_repo.find_by_email(email)
          return Failure(AUTHENTICATION_FAILED) unless user

          Success(user)
        end

        def validate_password(user:, password:)
          return Failure(AUTHENTICATION_FAILED) unless user&.correct_password?(password)

          Success(user)
        end

        def encode_token(user)
          token = generate_jwt.(email: user.email).success

          Success(email: user.email, token: token)
        end
      end
    end
  end
end
