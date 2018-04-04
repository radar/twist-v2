module Books
  module GraphQL
    QueryType = ::GraphQL::ObjectType.define do
      name "Query"
      description "The query root of this schema"

      field :books, types[BookType] do
        resolve Resolvers::Book::All.new
      end

      field :book do
        argument :permalink, !types.String

        type BookType
        resolve Resolvers::Book::ByPermalink.new
      end

      field :currentUser do
        type UserType

        resolve ->(_obj, _args, ctx) { ctx[:current_user] }
      end
    end
  end
end
