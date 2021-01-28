module Twist
  module Transactions
    module Readers
      class Remove < Transaction
        include Twist::Import["repositories.permission_repo"]

        def call(remover:, book_id:, user_id:)
          return permission_denied! unless permission_repo.author?(book_id: book_id, user_id: remover.id)

          Success(permission_repo.remove(book_id: book_id, user_id: user_id))
        end
      end
    end
  end
end
