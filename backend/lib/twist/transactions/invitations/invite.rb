module Twist
  module Transactions
    module Invitations
      class Invite
        include Dry::Transaction
        include Twist::Import["repositories.permission_repo"]

        step :invite

        def invite(book_id:, user_id:)
          permission = permission_repo.find_by_book_id_and_user_id(book_id, user_id)
          permission ||= permission_repo.create(book_id: book_id, user_id: user_id)
          Success(permission)
        end
      end
    end
  end
end
