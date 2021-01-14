module Twist
  class Branch < ROM::Struct
    attribute :id, Types::Integer
    attribute :name, Types::String
    attribute :default, Types::Bool
  end
end
