module Web
  module GraphQL
    LoginResultType = ::GraphQL::ObjectType.define do
      name "LoginResult"
      description "Result from a login mutation"

      field :token, types.String
      field :error, types.String
    end
  end
end
