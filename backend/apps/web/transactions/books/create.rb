require 'dry-transaction'

module Web
  module Transactions
    module Books
      class Create
        include Dry::Transaction
        include Web::Import["book_repo"]

        step :make_permalink
        step :create_book

        def make_permalink(input)
          input_with_permalink = input.merge(
            permalink: ::Books::Permalinker.new(input[:title]).permalink,
          )
          Success(input_with_permalink)
        end

        def create_book(input)
          book_data = input.merge(
            branches: [
              name: input[:default_branch],
              default: true,
            ],
          )
          book = book_repo.create_with_branches(book_data)
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
