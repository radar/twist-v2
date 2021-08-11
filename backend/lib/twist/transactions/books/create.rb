module Twist
  module Transactions
    module Books
      class Create < Twist::Transaction
        include Twist::Import["repositories.book_repo", "permalinker"]

        def call(params)
          create_book(add_permalink(params))
        end

        private

        def add_permalink(input)
          input.merge(
            permalink: permalinker.(input[:title]),
          )
        end

        def create_book(input)
          branches = [
            name: input.delete(:default_branch),
            default: true,
          ]

          book = book_repo.create_with_branches(input, branches)
          Success(book)
        end
      end
    end
  end
end
