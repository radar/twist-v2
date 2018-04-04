module Books
  module GraphQL
    Schema = ::GraphQL::Schema.define do
      query QueryType
      mutation LoginMutationType
      mutation NoteMutationType
    end
  end
end
