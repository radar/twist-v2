module Twist
  module Web
    module GraphQL
      class BookType < ::GraphQL::Schema::Object
        require_relative 'branch'

        graphql_name "Book"
        description "A book"

        field :id, ID, null: false
        field :title, String, null: false
        field :blurb, String, null: false
        field :permalink, String, null: false
        field :defaultBranch, BranchType, null: false
        field :latestCommit, CommitType, null: false
        field :commit, CommitType, null: false do
          argument :sha, String, required: false
        end

        def latest_commit
          context[:commit_repo].latest_for_default_branch(object.id)
        end

        def commit(sha: nil)
          if sha
            context[:commit_repo].by_sha(sha)
          else
            latest_commit
          end
        end

        def default_branch
          context[:branch_repo].by_book(object.id).detect(&:default)
        end
      end
    end
  end
end
