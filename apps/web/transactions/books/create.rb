require 'dry-transaction'

module Web
  module Transactions
    module Books
      class Create
        include Dry::Transaction

        step :make_permalink
        step :create_book

        def make_permalink(input)
          Success(
            input.merge(
              permalink: ::Books::Permalinker.new(input[:title]).permalink
            )
          )
        end

        def create_book(input)
          book = book_repo.create_with_branches(input.merge(
            branches: [
              name: input[:default_branch],
              default: true,
            ]
          ))
          Success(book)
        end

        private

        def book_repo
          BookRepository.new
        end
      end
    end
  end
end
