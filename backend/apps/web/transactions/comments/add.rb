module Web
  module Transactions
    module Comments
      class Add
        include Dry::Transaction
        include Web::Import["comment_repo"]

        step :add

        def add(current_user:, note_id:, text:)
          comment = comment_repo.create(
            user_id: current_user.id,
            note_id: note_id,
            text: text,
          )
          Success(comment)
        end
      end
    end
  end
end
