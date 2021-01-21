module Twist
  module Relations
    class Readers < ROM::Relation[:sql]
      schema(:users, as: :readers, infer: true) do
        associations do
          has_many :permissions
        end
      end

      def by_book(book_id)
        join(:permissions)
          .where({ permissions[:book_id] => book_id })
          .combine(:permissions)
      end
    end
  end
end
