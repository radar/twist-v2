module Twist
  module Repositories
    class ReaderRepo < Twist::Repository[:readers]
      def by_book(book_id)
        readers.by_book(book_id).to_a
      end
    end
  end
end
