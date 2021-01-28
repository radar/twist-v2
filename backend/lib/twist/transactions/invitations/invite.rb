module Twist
  module Transactions
    module Invitations
      class Invite < Transaction
        include Twist::Import[
          "repositories.permission_repo",
        ]

        def call(inviter:, book_id:, user_id:)
          return permission_denied! unless permission_repo.author?(book_id: book_id, user_id: inviter.id)

          permission = permission_repo.find_or_create_by_book_id_and_user_id(
            book_id: book_id,
            user_id: user_id,
          )
          Success(permission)
        end
      end
    end
  end
end
