module Books
  module GraphQL
    module Resolvers
      module User
        class ByID
          def call(note, _args, ctx)
            ctx[:user_loader].load(note.user_id)
          end
        end

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
