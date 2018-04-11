require_relative 'graphql/query_type'
require_relative 'graphql/mutations'

module Books
  module GraphQL
    Schema = ::GraphQL::Schema.define do
      lazy_resolve(Promise, :sync)

      query QueryType
      mutation Mutations
    end
  end
end
