module Web
  module GraphQL
    module Resolvers
      module Chapter
        class ByID
          def call(id)
            chapter_repo = ChapterRepository.new
            chapter_repo.by_id(id)
          end
        end
      end
    end
  end
end
