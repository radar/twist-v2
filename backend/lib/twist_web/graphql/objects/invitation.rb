
module Twist
  module Web
    module GraphQL
      class InvitationType < ::GraphQL::Schema::Object
        field :book_id, String, null: false
        field :user_id, String, null: false
      end
    end
  end
end
