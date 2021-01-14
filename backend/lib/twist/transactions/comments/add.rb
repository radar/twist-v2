module Twist
  module Transactions
    module Comments
      class Add < Transaction
        include Twist::Import["comment_repo"]

        def call(current_user:, note_id:, text:)
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
