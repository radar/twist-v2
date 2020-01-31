module Twist
  module Relations
    class Users < ROM::Relation[:sql]
      schema(:users, infer: true)
    end
  end
end
