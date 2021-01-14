module Twist
  module Web
    module GraphQL
      module Resolvers
        class Books < Resolver
          def call
            books = context[:book_repo].all
            books.select do |book|
              authorization = Authorization::Book.new(
                book: book,
                user: current_user,
                permission_repo: context[:permission_repo],
              )
              authorization.success?
            end
          end
        end
      end
    end
  end
end
