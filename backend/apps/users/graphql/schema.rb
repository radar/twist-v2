require 'graphql'

require_relative 'mutation_type'

module Users
  module GraphQL
    class Schema < ::GraphQL::Schema
      query QueryType
      mutation MutationType
    end
  end
end
