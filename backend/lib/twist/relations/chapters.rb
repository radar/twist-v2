module Twist
  module Relations
    class Chapters < ROM::Relation[:sql]
      schema(:chapters, infer: true)
    end
  end
end
