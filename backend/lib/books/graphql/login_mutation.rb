module Books
  module GraphQL
    LoginMutationType = ::GraphQL::ObjectType.define do
      name "LoginMutation"

      field :token, types.String do
        description "Login attempt"
        argument :email, !types.String
        argument :password, !types.String

        resolve Resolvers::Users::Authenticate.new
      end
    end
  end
end
