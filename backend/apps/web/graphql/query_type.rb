require_relative 'book'
require_relative 'user'

require_relative 'resolvers/book'
require_relative 'resolvers/element'

module Web
  module GraphQL
    class QueryType < ::GraphQL::Schema::Object
      graphql_name "Query"
      description "The query root of this schema"

      field :books, [BookType], null: false

      field :book, BookType, null: false do
        argument :permalink, String, required: true
      end

      field :elements_with_notes, [ElementType], null: false do
        argument :book_permalink, String, required: true
        argument :state, String, required: true
      end

      field :current_user, UserType, null: true

      def books
        Resolvers::Book::All.()
      end

      def book(permalink:)
        Resolvers::Book::ByPermalink.(permalink)
      end

      def elements_with_notes(book_permalink:, state:)
        Resolvers::Element::ByBook.(book_permalink: book_permalink, state: state)
      end

      def current_user
        context[:current_user]
      end
    end
  end
end
