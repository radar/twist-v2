require_relative 'book'
require_relative 'user'

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

      field :note, NoteType, null: false do
        argument :book_permalink, String, required: true
        argument :id, ID, required: true
      end


      field :current_user, UserType, null: true

      def books
        context[:book_repo].all
      end

      def book(permalink:)
        context[:book_repo].find_by_permalink(permalink)
      end

      def elements_with_notes(book_permalink:, state:)
        book = context[:book_repo].find_by_permalink(book_permalink)
        notes = context[:book_note_repo].by_book_and_state(book.id, state)

        context[:element_repo].by_ids(notes.to_a.map(&:element_id).uniq)
      end

      def note(book_permalink:, id:)
        book = context[:book_repo].find_by_permalink(book_permalink)
        context[:book_note_repo].by_book_and_id(book.id, id)
      end

      def current_user
        context[:current_user]
      end
    end
  end
end
