module Twist
  class Reader < ROM::Struct
    attribute :id, Types::Integer
    attribute :github_login, Types::String
    attribute :name, Types::String
    attribute :permissions, Types::Array.of(Permission)
  end
end
