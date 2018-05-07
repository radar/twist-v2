require_relative 'note'
require_relative 'resolvers/note'

require_relative 'image'
require_relative 'resolvers/image'

require_relative 'chapter'
require_relative 'resolvers/chapter'

module Web
  module GraphQL
    ElementType = ::GraphQL::ObjectType.define do
      name "Element"
      description "An element"

      field :id, types.ID
      field :content, types.String
      field :tag, types.String
      field :noteCount, types.Int do
        resolve Resolvers::Note::Count.new
      end

      field :image, ImageType do
        resolve Resolvers::Element::Image.new
      end

      field :notes, types[NoteType] do
        argument :state, !types.String
        resolve Resolvers::Note::ByElementAndState.new
      end

      field :chapter, ChapterType do
        resolve ->(element, _args, ctx) { ctx[:chapter_repo].by_id(element.chapter_id) }
      end
    end
  end
end
