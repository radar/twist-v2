module Books
  module GraphQL
    Schema = ::GraphQL::Schema.define do
      query QueryType
      mutation LoginMutationType
    end
  end
end
