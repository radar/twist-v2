module Web
  module GraphQL
    module Resolvers
      module Note
        class ByBookAndState
          def call(book_permalink, state)
            book_repo = BookRepository.new
            book = book_repo.find_by_permalink(book_permalink)
            book_note_repo = BookNoteRepository.new
            book_note_repo.by_book_and_state(book.id, state)
          end
        end

        class ByElementAndState
          def call(element, args, _ctx)
            book_note_repo = BookNoteRepository.new
            book_note_repo.by_element_and_state(element.id, args["state"])
          end
        end

        class ById
          def call(book, args, _ctx)
            book_note_repo = BookNoteRepository.new
            book_note_repo.by_book_and_id(book.id, args[:id])
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
