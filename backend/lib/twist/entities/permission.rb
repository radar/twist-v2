module Twist
  class Permission < ROM::Struct
    attribute :book_id, 'integer'
    attribute :user_id, 'integer'
  end
end
