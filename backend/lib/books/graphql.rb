module Books
  module GraphQL
    BookType = ::GraphQL::ObjectType.define do
      name "Book"
      description "A book"
      field :id, !types.ID
      field :title, !types.String
      field :blurb, !types.String
      field :permalink, !types.String
    end

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
        argument :permalink, types.String

        type BookType
        resolve -> (obj, args, ctx) {
          book_repo = BookRepository.new
          book_repo.find_by_permalink(args[:permalink])
        }
      end
    end

    Schema = ::GraphQL::Schema.define do
      query QueryType
    end
  end
end

