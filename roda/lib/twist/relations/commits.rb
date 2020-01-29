module Twist
  module Relations
    class Commits < ROM::Relation[:sql]
      schema(:commits, infer: true)
    end
  end
end
