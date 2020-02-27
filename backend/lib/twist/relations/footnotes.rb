module Twist
  module Relations
    class Footnotes < ROM::Relation[:sql]
      schema(:footnotes, infer: true)
    end
  end
end
