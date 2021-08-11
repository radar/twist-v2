module Twist
  module Web
    module GraphQL
      module Types
        class Chapter < ::GraphQL::Schema::Object

          graphql_name "Chapter"
          description "A chapter"

          field :id, ID, null: false
          field :title, String, null: false
          field :part, String, null: false
          field :position, Integer, null: false
          field :permalink, String, null: false
          field :previous_chapter, Types::Chapter, null: true
          field :next_chapter, Types::Chapter, null: true

          field :elements, [Types::Element], null: false
          field :footnotes, [Types::Footnote], null: false
          field :sections, resolver: Resolvers::Section::ByChapter, null: false
          field :commit, Types::Commit, null: false

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
            context[:footnote_repo].by_chapter_and_commit(object.id, object.commit_id)
          end

          def commit
            context[:commit_loader].load(object.commit_id)
          end
        end
      end
    end
  end
end
