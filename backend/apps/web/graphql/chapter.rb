require_relative 'resolvers/chapter'

require_relative 'element'
require_relative 'resolvers/element'

require_relative 'section'
require_relative 'resolvers/section'

require_relative 'image'
require_relative 'resolvers/image'

module Web
  module GraphQL
    ChapterType = ::GraphQL::ObjectType.define do
      name "Chapter"
      description "A chapter"

      field :id, types.ID
      field :title, !types.String
      field :part, !types.String
      field :position, !types.Int
      field :permalink, !types.String

      field :previousChapter, ChapterType do
        resolve Resolvers::Chapter::PreviousChapter.new
      end

      field :nextChapter, ChapterType do
        resolve Resolvers::Chapter::NextChapter.new
      end

      field :elements, types[ElementType] do
        resolve Resolvers::Element::ByChapter.new
      end

      field :sections, types[SectionType] do
        resolve Resolvers::Section::ByChapter.new
      end

      field :images, types[ImageType] do
        resolve Resolvers::Image::ByChapter.new
      end

      field :commit, CommitType do
        resolve -> (chapter, _args, ctx) { ctx[:commit_loader].load(chapter.commit_id) }
      end
    end
  end
end
