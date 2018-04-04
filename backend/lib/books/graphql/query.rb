module Books
  module GraphQL
    QueryType = ::GraphQL::ObjectType.define do
      name "Query"
      description "The query root of this schema"

      field :books, types[BookType] do
        resolve -> (obj, args, ctx) {
          book_repo = BookRepository.new
          book_repo.all
        }
      end

      field :book do
        argument :permalink, !types.String

        type BookType
        resolve -> (obj, args, ctx) {
          book_repo = BookRepository.new
          book_repo.find_by_permalink(args[:permalink])
        }
      end

      field :currentUser do
        type UserType

        resolve -> (obj, args, ctx) {
          ctx[:current_user]
        }
      end
    end
  end
end
