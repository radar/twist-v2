module Web
  module GraphQL
    module Resolvers
      module Note
        class ByBook
          def call(book, _args, _ctx)
            book_note_repo = BookNoteRepository.new
            book_note_repo.by_book(book.id)
          end
        end

        class ByElement
          def call(element, _args, _ctx)
            book_note_repo = BookNoteRepository.new
            book_note_repo.by_element(element.id)
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
