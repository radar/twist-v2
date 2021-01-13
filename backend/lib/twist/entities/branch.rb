module Twist
  class Branch < ROM::Struct
    puts "HELLO"
    attribute :id, Types::Integer
    attribute :name, Types::String
    attribute :default, Types::Bool
  end
end
