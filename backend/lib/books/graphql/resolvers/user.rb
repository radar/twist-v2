module Books
  module GraphQL
    module Resolvers
      module Users
        class Authenticate
          def call(_obj, args, _ctx)
            user_repo = UserRepository.new
            user = user_repo.find_by_email(args["email"])
            user_repo.regenerate_token(user.id) if user.correct_password?(args["password"])
          end
        end
      end
    end
  end
end
