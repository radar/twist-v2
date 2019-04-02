module Web
  module Transactions
    module Notes
      class Submit
        include Dry::Transaction
        include Web::Import["book_note_repo"]
        include Web::Import["note_repo"]

        step :submit

        def submit(book_id:, current_user:, element_id:, text:)
          note_count = book_note_repo.count_for_book(book_id)
          note = note_repo.create(
            number: note_count + 1,
            state: "open",
            user_id: current_user.id,
            element_id: element_id,
            text: text,
          )
          Success(note)
        end
      end
    end
  end
end
