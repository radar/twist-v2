module Books
  module GraphQL
    module Resolvers
      class Branch
        def call(book, _args, ctx)
          branch_repo = BranchRepository.new
          branches = branch_repo.by_book(book.id).to_a
          branches.detect(&:default)
        end
      end
    end
  end
end
