module Books
  module GraphQL
    module Resolvers
      module Element
        class ByBook
          def call(book, args, ctx)
            notes = Note::ByBook.new.(book, args, ctx)

            element_repo = ElementRepository.new
            element_repo.by_ids(notes.to_a.map(&:element_id).uniq)
          end
        end

        class ByChapter
          def call(chapter, _args, _ctx)
            element_repo = ElementRepository.new
            element_repo.by_chapter(chapter.id)
          end
        end
      end
    end
  end
end
