module Twist
  module Transactions
    module Notes
      class Update < Transaction
        include Twist::Import["note_repo"]

        def call(id:, text:)
          Success(note_repo.update_text(id, text: text))
        end
      end
    end
  end
end
