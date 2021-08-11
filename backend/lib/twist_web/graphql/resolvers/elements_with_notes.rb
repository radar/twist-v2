module Twist
  module Web
    module GraphQL
      module Resolvers
        class ElementsWithNotes < Resolver
          def resolve(book_permalink:, state:)
            book = context[:book_repo].find_by_permalink(book_permalink)
            notes = context[:book_note_repo].by_book_and_state(book.id, state.downcase)

            context[:element_repo].by_ids(notes.to_a.map(&:element_id).uniq)
          end
        end
      end
    end
  end
end
