module Twist
  module Relations
    class Branches < ROM::Relation[:sql]
      schema(:branches, infer: true)
    end
  end
end
