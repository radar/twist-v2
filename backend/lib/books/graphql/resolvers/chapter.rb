module Books
  module GraphQL
    module Resolvers
      module Chapter
        class All
          def call(branch, args, _ctx)
            commit_repo = CommitRepository.new
            commit = commit_repo.latest_for_branch(branch.id)
            return [] unless commit

            chapter_repo = ChapterRepository.new
            chapter_repo.for_commit_and_part(commit.id, args["part"].downcase)
          end
        end

        class ByPermalink
          def call(branch, args, _ctx)
            commit_repo = CommitRepository.new
            commit = commit_repo.latest_for_branch(branch.id)
            return [] unless commit

            chapter_repo = ChapterRepository.new
            chapter_repo.for_commit_and_permalink(commit.id, args["permalink"])
          end
        end
      end
    end
  end
end
