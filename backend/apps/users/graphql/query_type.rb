require_relative "objects/user"

module Users
  module GraphQL
    class QueryType < ::GraphQL::Schema::Object
      graphql_name "Query"
      description "The query root of this schema"

      field :current_user, UserType, null: true

      def current_user
        context[:current_user]
      end
    end
  end
end
