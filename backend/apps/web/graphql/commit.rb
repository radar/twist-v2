require_relative 'branch'

require_relative 'resolvers/branch'

module Web
  module GraphQL
    CommitType = ::GraphQL::ObjectType.define do
      name "Commit"
      description "A commit"

      field :sha, !types.String
      field :created_at, types.String

      field :branch, BranchType do
        resolve -> (commit, _args, _ctx) { Resolvers::Branch::ByID.new.(commit.branch_id) }
      end
    end
  end
end
