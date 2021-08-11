module Twist
  module Web
    module GraphQL
      module Types
        class User < ::GraphQL::Schema::Object
          graphql_name "User"
          description "A user"

          field :id, ID, null: false
          field :name, String, null: false
          field :email, String, null: false
          field :github_login, String, null: true
        end
      end
    end
  end
end
