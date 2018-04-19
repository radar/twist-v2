module Web
  module GraphQL
    module Resolvers
      module Image
        class ByChapter
          def call(chapter, _args, _ctx)
            image_repo = ImageRepository.new

            image_repo.by_chapter(chapter.id)
          end
        end
      end
    end
  end
end
