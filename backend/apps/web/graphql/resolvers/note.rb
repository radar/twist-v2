module Web
  module GraphQL
    module Resolvers
      module Note
        class ByBookAndState
          def call(permalink:, state:)
            book_repo = BookRepository.new
            book = book_repo.find_by_permalink(permalink)
            book_note_repo = BookNoteRepository.new
            book_note_repo.by_book_and_state(book.id, state)
          end
        end

        class ByElementAndState
          def call(element, args, ctx)
            ctx[:book_note_repo].by_element_and_state(element.id, args["state"])
          end
        end

        class Count
          def call(element, _args, ctx)
            ctx[:note_count_loader].load(element.id)
          end
        end
      end
    end
  end
end
