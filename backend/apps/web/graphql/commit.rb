module Web
  module GraphQL
    class CommitType < ::GraphQL::Schema::Object
      require_relative 'branch'

      graphql_name "Commit"
      description "A commit"

      field :id, !types.ID
      field :sha, !types.String
      field :created_at, types.String
      field :branch, BranchType

      def created_at
        object.created_at.iso8601
      end

      def branch
        context[:branch_loader].load(object.branch_id)
      end
    end
  end
end
