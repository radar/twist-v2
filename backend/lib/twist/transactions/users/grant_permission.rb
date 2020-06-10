module Twist
  module Transactions
    module Users
      class GrantPermission
        include Twist::Import["repositories.permission_repo"]

        def call(user:, book:)
          permission_repo.create(user_id: user.id, book_id: book.id)
        end
      end
    end
  end
end
