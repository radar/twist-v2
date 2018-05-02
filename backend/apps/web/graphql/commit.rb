require_relative 'branch'

require_relative 'resolvers/branch'

module Web
  module GraphQL
    CommitType = ::GraphQL::ObjectType.define do
      name "Commit"
      description "A commit"

      field :id, !types.ID
      field :sha, !types.String
      field :createdAt, types.String do
        resolve ->(obj, _args, _ctx) { obj.created_at.iso8601 }
      end

      field :branch, BranchType do
        resolve ->(commit, _args, ctx) { ctx[:branch_loader].load(commit.branch_id) }
      end
    end
  end
end
