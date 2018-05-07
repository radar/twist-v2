require_relative 'resolvers/chapter'

require_relative 'commit'

require_relative 'element'
require_relative 'resolvers/element'

require_relative 'section'
require_relative 'resolvers/section'

require_relative 'image'
require_relative 'resolvers/image'

module Web
  module GraphQL
    class ChapterType < ::GraphQL::Schema::Object
      graphql_name "Chapter"
      description "A chapter"

      field :id, ID, null: false
      field :title, String, null: false
      field :part, String, null: false
      field :position, Integer, null: false
      field :permalink, String, null: false
      field :previous_chapter, ChapterType, null: true
      field :next_chapter, ChapterType, null: true

      field :elements, [ElementType], null: true
      field :sections, [SectionType], null: true
      field :images, [ImageType], null: true
      field :commit, CommitType, null: true

      def previous_chapter
        Resolvers::Chapter::PreviousChapter.new.(object)
      end

      def next_chapter
        Resolvers::Chapter::NextChapter.new.(object)
      end

      def elements
        Resolvers::Element::ByChapter.new.(object)
      end

      def sections
        Resolvers::Section::ByChapter.new.(object)
      end

      def images
        Resolvers::Image::ByChapter.new.(object)
      end

      def commit
        context[:commit_loader].load(object.commit_id)
      end
    end
  end
end
