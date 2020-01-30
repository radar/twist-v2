module Twist
  module Relations
    class Notes < ROM::Relation[:sql]
      schema(:notes, infer: true)
    end
  end
end
