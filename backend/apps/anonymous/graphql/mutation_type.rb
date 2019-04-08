require_relative 'mutations/users/authenticate'

module Anonymous
  module GraphQL
    class MutationType < ::GraphQL::Schema::Object
      graphql_name "Mutations"

      field :login, mutation: Mutations::Users::Authenticate
    end
  end
end
