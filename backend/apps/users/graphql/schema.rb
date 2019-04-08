require 'graphql'

require_relative 'mutation_type'

module Users
  module GraphQL
    class Schema < ::GraphQL::Schema
      mutation MutationType
    end
  end
end
