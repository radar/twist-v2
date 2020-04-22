module Twist
  module Relations
    class Permissions < ROM::Relation[:sql]
      schema(:permissions, infer: true)
    end
  end
end
