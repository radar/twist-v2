require_relative 'element'
require_relative 'resolvers/element'

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
        resolve Resolvers::Element::ByChapter.new
      end
    end
  end
end
