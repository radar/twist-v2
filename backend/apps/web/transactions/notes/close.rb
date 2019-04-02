module Web
  module Transactions
    module Notes
      class Close
        include Dry::Transaction
        include Web::Import["note_repo"]

        step :close

        def close(id:)
          Success(note_repo.close(id))
        end
      end
    end
  end
end
