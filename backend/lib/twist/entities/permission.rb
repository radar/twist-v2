module Twist
  class Permission < ROM::Struct
    attribute :book_id, Types::Integer
    attribute :user_id, Types::Integer
  end
end
