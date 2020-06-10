module Twist
  module Transactions
    module Comments
      class Update
        include Dry::Transaction
        include Twist::Import["comment_repo"]

        step :update

        def update(id:, text:)
          comment = comment_repo.update(id, text: text)
          Success(comment)
        end
      end
    end
  end
end
