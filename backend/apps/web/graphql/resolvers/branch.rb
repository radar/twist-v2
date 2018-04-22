module Web
  module GraphQL
    module Resolvers
      module Branch
        class Default
          def call(book, _args, _ctx)
            branch_repo = BranchRepository.new
            branches = branch_repo.by_book(book.id).to_a
            branches.detect(&:default)
          end
        end

        class ByID
          def call(id)
            branch_repo = BranchRepository.new
            branch_repo.by_id(id)
          end
        end
      end
    end
  end
end
