module Books
  module GraphQL
    BookType = ::GraphQL::ObjectType.define do
      name "Book"
      description "A book"
      field :id, types.ID
      field :title, !types.String
      field :blurb, !types.String
      field :permalink, !types.String
      field :defaultBranch, BranchType do
        resolve -> (book, _args, ctx) {
          branch_repo = BranchRepository.new
          branches = branch_repo.by_book(book.id).to_a
          branches.detect(&:default)
        }
      end
    end
  end
end
