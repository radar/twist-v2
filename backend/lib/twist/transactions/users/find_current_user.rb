module Twist
  module Transactions
    module Users
      class FindCurrentUser < Transaction
        include Twist::Import["repositories.user_repo"]

        def call(token)
          return Failure("no token specified") if !token || token.length == 0

          token = token.split.last
          return Failure("no token specified") unless token

          payload, _headers = JWT.decode token, ENV.fetch('AUTH_TOKEN_SECRET'), true, algorithm: 'HS256'
          user = user_repo.find_by_email(payload["email"])
          user ? Success(user) : Failure("no user found")
        end
      end
    end
  end
end
