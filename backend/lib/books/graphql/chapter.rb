module Books
  module GraphQL
    ChapterType = ::GraphQL::ObjectType.define do
      name "Chapter"
      description "A chapter"

      field :id, types.ID
      field :title, !types.String
      field :part, !types.String
      field :position, !types.Int
      field :permalink, !types.String

      field :elements, types[ElementType] do
        resolve -> (chapter, _args, _ctx) {
          element_repo = ElementRepository.new
          element_repo.by_chapter(chapter.id)
        }
      end
    end
  end
end
