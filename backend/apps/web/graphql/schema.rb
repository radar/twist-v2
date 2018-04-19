require_relative 'query_type'
require_relative 'mutations'

module Web
  module GraphQL
    Schema = ::GraphQL::Schema.define do
      lazy_resolve(Promise, :sync)

      query QueryType
      mutation Mutations
    end
  end
end
