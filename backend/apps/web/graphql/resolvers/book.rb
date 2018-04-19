module Web
  module GraphQL
    module Resolvers
      module Book
        class All
          def call(_obj, _args, _ctx)
            book_repo = BookRepository.new
            book_repo.all
          end
        end

        class ByPermalink
          def call(_obj, args, _ctx)
            book_repo = BookRepository.new
            book_repo.find_by_permalink(args[:permalink])
          end
        end
      end
    end
  end
end
