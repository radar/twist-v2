module Twist
  module Web
    module GraphQL
      module Resolvers
        class Book < Resolver
          def resolve(permalink:)
            book = context[:book_repo].find_by_permalink(permalink)
            authorization = Authorization::Book.new(
              book: book,
              user: current_user,
              permission_repo: context[:permission_repo],
            )

            return book if authorization.success?

            authorization
          end
        end
      end
    end
  end
end
