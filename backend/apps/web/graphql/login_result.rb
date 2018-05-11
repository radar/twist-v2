module Web
  module GraphQL
    class LoginResultType < ::GraphQL::Schema::Object
      graphql_name "LoginResult"
      description "Result from a login mutation"

      field :email, types.String
      field :token, types.String
      field :error, types.String
    end
  end
end
