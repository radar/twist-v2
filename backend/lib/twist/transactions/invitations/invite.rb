module Twist
  module Transactions
    module Invitations
      class Invite < Transaction
        include Twist::Import["repositories.permission_repo"]

        def initialize(current_user: nil, **kwargs)
          @current_user = current_user
          super(**kwargs)
        end

        def call(book_id:, user_id:)
          permission = permission_repo.find_by_book_id_and_user_id(book_id, user_id)
          permission ||= permission_repo.create(book_id: book_id, user_id: user_id)
          Success(permission)
        end
      end
    end
  end
end
