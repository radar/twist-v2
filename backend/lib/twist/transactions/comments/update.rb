module Twist
  module Transactions
    module Comments
      class Update < Transaction
        include Twist::Import["comment_repo"]

        def call(id:, text:)
          comment = comment_repo.update(id, text: text)
          Success(comment)
        end
      end
    end
  end
end
