module Twist
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
          argument :state, Types::NoteState, required: true
        end

        field :note, NoteType, null: false do
          argument :book_permalink, String, required: true
          argument :number, Integer, required: true
        end

        field :current_user, UserType, null: true

        field :comments, [CommentType], null: false do
          argument :note_id, ID, required: true
        end

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

        def note(book_permalink:, number:)
          book = context[:book_repo].find_by_permalink(book_permalink)
          context[:book_note_repo].by_book_and_number(book.id, number)
        end

        def current_user
          context[:current_user]
        end

        def comments(note_id:)
          context[:comment_repo].by_note_id(note_id)
        end
      end
    end
  end
end
