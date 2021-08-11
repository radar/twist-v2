module Twist
  module Web
    module GraphQL
      module Types
        class Branch < ::GraphQL::Schema::Object
          graphql_name "Branch"
          description "A branch"

          field :id, ID, null: false
          field :name, String, null: false
          field :default, Boolean, null: false
          field :chapters, [Types::Chapter], null: false do
            argument :part, Types::Part, required: true
          end

          field :chapter, Types::Chapter, null: false do
            argument :permalink, String, required: true
          end

          field :commits, [Types::Commit], null: false

          def default
            !!object.default
          end

          def chapters(part:)
            return [] unless latest_commit

            context[:chapter_repo].for_commit_and_part(latest_commit.id, part.downcase)
          end

          def chapter(permalink:)
            return [] unless latest_commit

            context[:chapter_repo].for_commit_and_permalink(latest_commit.id, permalink)
          end

          def commits
            context[:commit_repo].for_branch(object.id)
          end

          private

          def latest_commit
            @latest_commit ||= context[:commit_repo].latest_for_branch(object.id)
          end
        end
      end
    end
  end
end
