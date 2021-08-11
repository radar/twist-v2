module Twist
  module Web
    module GraphQL
      module Resolvers
        class Note < Resolver
          def resolve(book_permalink:, number:)
            book = context[:book_repo].find_by_permalink(book_permalink)
            context[:book_note_repo].by_book_and_number(book.id, number)
          end
        end
      end
    end
  end
end
