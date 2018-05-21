module Web
  module GraphQL
    class LoginResultType < ::GraphQL::Schema::Object
      graphql_name "LoginResult"
      description "Result from a login mutation"

      field :email, String, null: true
      field :token, String, null: true
      field :error, String, null: true
    end
  end
end
