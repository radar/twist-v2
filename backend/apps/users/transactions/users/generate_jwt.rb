module Users
  module Transactions
    module Users
      class GenerateJWT
        def call(email:)
          hmac_secret = ENV.fetch("AUTH_TOKEN_SECRET")
          payload = { email: email }
          JWT.encode(payload, hmac_secret, 'HS256')
        end
      end
    end
  end
end
