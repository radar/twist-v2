require_relative 'chapter'
require_relative 'part'

require_relative 'resolvers/chapter'

module Web
  module GraphQL
    class BranchType < ::GraphQL::Schema::Object
      graphql_name "Branch"
      description "A branch"

      field :id, ID, null: false
      field :name, String, null: false
      field :default, Boolean, null: false
      field :chapters, [ChapterType], null: false do
        argument :part, PartType, required: true
      end

      field :chapter, ChapterType, null: false do
        argument :permalink, String, required: true
      end

      def chapters(part:)
        return [] unless latest_commit

        context[:chapter_repo].for_commit_and_part(latest_commit.id, part.downcase)
      end

      def chapter(permalink:)
        return [] unless latest_commit

        context[:chapter_repo].for_commit_and_permalink(latest_commit.id, permalink)
      end

      private

      def latest_commit
        @latest_commit ||= context[:commit_repo].latest_for_branch(object.id)
      end
    end
  end
end
