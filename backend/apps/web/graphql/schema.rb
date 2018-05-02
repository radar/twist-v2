require_relative 'query_type'
require_relative 'mutation_type'

module Web
  module GraphQL
    Schema = ::GraphQL::Schema.define do
      lazy_resolve(Promise, :sync)

      query QueryType
      mutation MutationType
    end
  end
end
