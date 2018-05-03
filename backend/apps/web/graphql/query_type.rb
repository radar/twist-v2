require_relative 'book'
require_relative 'user'

require_relative 'resolvers/book'

module Web
  module GraphQL
    QueryType = ::GraphQL::ObjectType.define do
      name "Query"
      description "The query root of this schema"

      field :books, types[BookType] do
        resolve Resolvers::Book::All.new
      end

      field :book, BookType do
        argument :permalink, !types.String

        resolve Resolvers::Book::ByPermalink.new
      end

      field :elementsWithNotes, types[ElementType] do
        argument :bookPermalink, types.String
        argument :state, types.String
        resolve Resolvers::Element::ByBook.new
      end

      field :currentUser, UserType do
        resolve ->(_obj, _args, ctx) { ctx[:current_user] }
      end
    end
  end
end
