require 'books/graphql/query_type'

module Books
  module GraphQL
    Schema = ::GraphQL::Schema.define do
      lazy_resolve(Promise, :sync)

      query QueryType
      mutation Mutations
    end
  end
end
