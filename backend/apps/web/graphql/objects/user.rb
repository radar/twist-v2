module Web
  module GraphQL
    class UserType < ::GraphQL::Schema::Object
      graphql_name "User"
      description "A user"

      field :id, ID, null: true
      field :name, String, null: true
      field :email, String, null: true
    end
  end
end
