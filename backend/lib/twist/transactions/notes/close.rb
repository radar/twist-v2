module Twist
  module Transactions
    module Notes
      class Close < Transaction
        include Twist::Import["note_repo"]

        def call(id:)
          Success(note_repo.close(id))
        end
      end
    end
  end
end
