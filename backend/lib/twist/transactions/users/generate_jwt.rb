module Twist
  module Transactions
    module Users
      class GenerateJwt < Transaction
        def call(email:)
          hmac_secret = ENV.fetch("AUTH_TOKEN_SECRET")
          payload = { email: email }
          Success(JWT.encode payload, hmac_secret, 'HS256')
        end
      end
    end
  end
end
