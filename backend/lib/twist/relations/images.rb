module Twist
  module Relations
    class Images < ROM::Relation[:sql]
      schema(:images, infer: true)
    end
  end
end
