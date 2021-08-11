module Twist
  module Web
    module GraphQL
      module Types
        class Commit < ::GraphQL::Schema::Object
          graphql_name "Commit"
          description "A commit"

          field :id, ID, null: false
          field :sha, String, null: false
          field :created_at, String, null: false
          field :message, String, null: true
          field :branch, Types::Branch, null: false
          field :chapter, Types::Chapter, null: false do
            argument :permalink, String, required: true
          end

          field :chapters, [Types::Chapter], null: false do
            argument :part, Types::Part, required: true
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
end
