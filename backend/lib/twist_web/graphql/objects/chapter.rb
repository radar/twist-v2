require_relative '../resolvers/section'

module Twist
  module Web
    module GraphQL
      class ChapterType < ::GraphQL::Schema::Object
        require_relative 'commit'
        require_relative 'element'
        require_relative 'footnote'
        require_relative 'image'
        require_relative 'section'

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
        field :footnotes, [FootnoteType], null: true
        field :sections, resolver: Resolvers::Section::ByChapter
        field :commit, CommitType, null: true

        def previous_chapter
          context[:chapter_repo].previous_chapter(object.commit_id, object)
        end

        def next_chapter
          context[:chapter_repo].next_chapter(object.commit_id, object)
        end

        def elements
          context[:element_repo].by_chapter(object.id)
        end

        def footnotes
          context[:footnote_repo].by_chapter_and_commit(object.id. object.commit_id)
        end

        def commit
          context[:commit_loader].load(object.commit_id)
        end
      end
    end
  end
end
