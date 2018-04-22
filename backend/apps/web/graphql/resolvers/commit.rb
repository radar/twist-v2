module Web
  module GraphQL
    module Resolvers
      module Commit
        class ByID
          def call(id)
            commit_repo = CommitRepository.new
            commit_repo.by_id(id)
          end
        end
      end
    end
  end
end
