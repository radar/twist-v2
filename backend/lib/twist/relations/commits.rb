module Twist
  module Relations
    class Commits < ROM::Relation[:sql]
      schema(:commits, infer: true) do
        associations do
          belongs_to :branch
        end
      end

      def by_book_and_sha(book_id, sha)
        book_scope(book_id).where { commits[:sha].ilike("#{sha}%") }.first
      end

      def latest_for_book_and_ref(book_id, ref)
        book_scope(book_id)
          .where { { branches[:name] => ref } }
          .order { created_at.desc }
          .first
      end

      def latest_for_default_branch(book_id)
        book_scope(book_id, default_branch: true)
          .order { created_at.desc }
          .first
      end

      private

      def book_scope(book_id, default_branch: false)
        query = if default_branch
                  join(:branches, id: :branch_id, default: true)
                else
                  join(:branches)
                end

        query.join(:books, id: :book_id)
          .where { { books[:id] => book_id } }
      end
    end
  end
end
