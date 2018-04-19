require 'jwt'

module Web
  module GraphQL
    module Resolvers
      module User
        class ByID
          def call(note, _args, ctx)
            ctx[:user_loader].load(note.user_id)
          end
        end

        class Authenticate
          include Dry::Monads::Result::Mixin

          Result = Struct.new(:token, :email, :error)

          def call(_obj, args, ctx)
            user_repo = ctx[:user_repo]
            user = user_repo.find_by_email(args["email"])

            error = Result.new(nil, "Invalid username or password.")
            return error unless user&.correct_password?(args["password"])

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
