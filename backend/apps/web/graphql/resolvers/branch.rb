module Web
  module GraphQL
    module Resolvers
      class Branch
        def call(book, _args, _ctx)
          branch_repo = BranchRepository.new
          branches = branch_repo.by_book(book.id).to_a
          branches.detect(&:default)
        end
      end
    end
  end
end
