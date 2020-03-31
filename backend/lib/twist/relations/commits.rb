module Twist
  module Relations
    class Commits < ROM::Relation[:sql]
      schema(:commits, infer: true)

      def latest_for_default_branch(book_id)
        join(:branches, id: :branch_id, default: true)
        .join(:books, id: book_id)
        .first
      end
    end
  end
end
