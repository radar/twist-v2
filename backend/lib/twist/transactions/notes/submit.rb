module Twist
  module Transactions
    module Notes
      class Submit < Transaction
        include Twist::Import["repositories.book_repo"]
        include Twist::Import["repositories.book_note_repo"]
        include Twist::Import["repositories.note_repo"]

        def call(book_permalink:, user_id:, element_id:, text:)
          book = book_repo.find_by_permalink(book_permalink)
          note_count = book_note_repo.count_for_book(book.id)
          note = note_repo.create(
            number: note_count + 1,
            state: "open",
            user_id: user_id,
            element_id: element_id,
            text: text,
          )
          Success(note)
        end
      end
    end
  end
end
