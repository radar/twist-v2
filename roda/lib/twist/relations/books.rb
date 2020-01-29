module Twist
  module Relations
    class Books < ROM::Relation[:sql]
      schema(:books, infer: true) do
        associations do
          has_many :branches
        end
      end
    end
  end
end
