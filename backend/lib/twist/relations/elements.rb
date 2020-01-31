module Twist
  module Relations
    class Elements < ROM::Relation[:sql]
      schema(:elements, infer: true)
    end
  end
end
