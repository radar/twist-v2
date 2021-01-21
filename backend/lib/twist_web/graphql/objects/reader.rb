module Twist
  module Web
    module GraphQL
      class ReaderType < ::GraphQL::Schema::Object
        graphql_name "Reader"
        description "A reader for a book"

        field :id, ID, null: false
        field :name, String, null: false
        field :email, String, null: false
        field :github_login, String, null: true
        field :author, Boolean, null: false
      end
    end
  end
end
