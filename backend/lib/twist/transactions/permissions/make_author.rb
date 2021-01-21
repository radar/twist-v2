module Twist
  module Transactions
    module Permissions
      class MakeAuthor < Transaction
        include Twist::Import["repositories.permission_repo"]
        def call(book_id:, user_id:)
          permission_repo.make_author(book_id: book_id, user_id: user_id)
        end
      end
    end
  end
end
