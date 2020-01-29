require 'dry-transaction'
require 'twist/permalinker'

module Twist
  module Transactions
    module Books
      class Create
        include Dry::Transaction
        include Twist::Import["book_repo"]

        step :make_permalink
        step :create_book

        def make_permalink(input)
          input_with_permalink = input.merge(
            permalink: ::Twist::Permalinker.new(input[:title]).permalink,
          )
          Success(input_with_permalink)
        end

        def create_book(input)
          book_data = input.merge(
            branches: [
              name: input.delete(:default_branch),
              default: true,
            ],
          )
          book = book_repo.create_with_branches(book_data)
          Success(book)
        end
      end
    end
  end
end
