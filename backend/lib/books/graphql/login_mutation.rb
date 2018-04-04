module Books
  module GraphQL
    LoginMutationType = ::GraphQL::ObjectType.define do
      name "LoginMutation"

      field :token, types.String do
        description "Login attempt"
        argument :email, !types.String
        argument :password, !types.String

        resolve -> (obj, args, ctx) {
          user_repo = UserRepository.new
          user = user_repo.find_by_email(args["email"])
          if user.correct_password?(args["password"])
            user_repo.regenerate_token(user.id)
          end
        }
      end
    end
  end
end

