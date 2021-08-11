module Twist
  module Entities
    class User < ROM::Struct
      attribute :github_login, Types::String
      attribute :name, Types::String
    end
  end
end
