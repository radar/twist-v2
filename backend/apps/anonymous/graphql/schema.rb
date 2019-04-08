require 'graphql'

require_relative 'mutation_type'

module Anonymous
  module GraphQL
    class Schema < ::GraphQL::Schema
      mutation MutationType
    end
  end
end
