module Twist
  module Relations
    class Comments < ROM::Relation[:sql]
      schema(:comments, infer: true)
    end
  end
end
