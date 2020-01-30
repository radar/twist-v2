module Twist
  module Relations
    class BookNotes < ROM::Relation[:sql]
      schema(:book_notes, infer: true)
    end
  end
end
