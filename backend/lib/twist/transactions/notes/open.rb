module Twist
  module Transactions
    module Notes
      class Open
        include Dry::Transaction
        include Twist::Import["note_repo"]

        step :open

        def open(id:)
          Success(note_repo.open(id))
        end
      end
    end
  end
end
