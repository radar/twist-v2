module Twist
  module Transactions
    module Invitations
      class Invite
        include Dry::Transaction
        include Twist::Import["permission_repo"]

        step :invite

        def invite(book_id:, user_id:)
          Success(permission_repo.create(book_id: book_id, user_id: user_id))
        end
      end
    end
  end
end
