module Books
  module GraphQL
    module Resolvers
      module Element
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