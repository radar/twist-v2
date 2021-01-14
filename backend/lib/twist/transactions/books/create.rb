require 'dry-transaction'
require 'twist/permalinker'

module Twist
  module Transactions
    module Books
      class Create < Twist::Transaction
        include Twist::Import["repositories.book_repo"]

        def call(input)
          input = yield add_permalink(input)
          book = yield create_book(input)
          Success(book)
        end

        def add_permalink(input)
          Success(input.merge(
            permalink: ::Twist::Permalinker.new(input[:title]).permalink,
          ))
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
