module Twist
  module Transactions
    module Books
      class Find
        include Twist::Import["repositories.book_repo"]

        def call(permalink:)
          book_repo.find_by_permalink(permalink)
        end
      end
    end
  end
end
