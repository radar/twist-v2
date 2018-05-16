module Web
  module GraphQL
    class CommitType < ::GraphQL::Schema::Object
      require_relative 'branch'

      graphql_name "Commit"
      description "A commit"

      field :id, ID, null: false
      field :sha, String, null: false
      field :created_at, String, null: false
      field :branch, BranchType, null: false

      def created_at
        object.created_at.iso8601
      end

      def branch
        context[:branch_loader].load(object.branch_id)
      end
    end
  end
end
