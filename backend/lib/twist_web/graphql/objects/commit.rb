module Twist
  module Web
    module GraphQL
      class CommitType < ::GraphQL::Schema::Object
        require_relative 'branch'
        require_relative 'part'

        graphql_name "Commit"
        description "A commit"

        field :id, ID, null: false
        field :sha, String, null: false
        field :created_at, String, null: false
        field :message, String, null: true
        field :branch, BranchType, null: false
        field :chapter, ChapterType, null: false do
          argument :permalink, String, required: true
        end

        field :chapters, [ChapterType], null: false do
          argument :part, PartType, required: true
        end

        def created_at
          object.created_at.iso8601
        end

        def branch
          context[:branch_loader].load(object.branch_id)
        end

        def chapter(permalink:)
          context[:chapter_repo].for_commit_and_permalink(object.id, permalink)
        end

        def chapters(part:)
          context[:chapter_repo].for_commit_and_part(object.id, part.downcase)
        end
      end
    end
  end
end
