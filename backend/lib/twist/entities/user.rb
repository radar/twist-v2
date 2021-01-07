module Twist
  class User < ROM::Struct
    attribute :github_login, 'string'
    attribute :name, 'string'
  end
end
