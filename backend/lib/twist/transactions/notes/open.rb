module Twist
  module Transactions
    module Notes
      class Open < Transaction
        include Twist::Import["note_repo"]

        def call(id:)
          Success(note_repo.open(id))
        end
      end
    end
  end
end
