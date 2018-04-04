module Books
  module GraphQL
    BranchType = ::GraphQL::ObjectType.define do
      name "Branch"
      description "A branch"

      field :id, types.ID
      field :name, !types.String
      field :default, !types.Boolean
      field :chapters, types[ChapterType] do
        argument :part, !PartType

        resolve -> (branch, args, ctx) {
          commit_repo = CommitRepository.new
          commit = commit_repo.latest_for_branch(branch.id)
          return [] unless commit

          chapter_repo = ChapterRepository.new
          chapter_repo.for_commit_and_part(commit.id, args["part"].downcase)
        }
      end

      field :chapter, ChapterType do
        argument :permalink, !types.String

        resolve -> (branch, args, ctx) {
          commit_repo = CommitRepository.new
          commit = commit_repo.latest_for_branch(branch.id)
          return [] unless commit

          chapter_repo = ChapterRepository.new
          chapter_repo.for_commit_and_permalink(commit.id, args["permalink"])
        }
      end
    end
  end
end
