
module Twist
  module Web
    module GraphQL
      class InvitationType < ::GraphQL::Schema::Object
        field :book_id, String, null: false
        field :user_id, String, null: false

        def book_id
          object.success.book_id
        end

        def user_id
          object.success.user_id
        end
      end
    end
  end
end
