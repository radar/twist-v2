module Twist
  module Transactions
    module Notes
      class Update
        include Dry::Transaction
        include Twist::Import["note_repo"]

        step :update

        def update(id:, text:)
          Success(note_repo.update_text(id, text: text))
        end
      end
    end
  end
end
