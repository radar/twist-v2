module Books
  module GraphQL
    Schema = ::GraphQL::Schema.define do
      lazy_resolve(Promise, :sync)

      query QueryType
      mutation LoginMutationType
      mutation NoteMutationType
    end
  end
end
