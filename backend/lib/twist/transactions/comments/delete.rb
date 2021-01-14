module Twist
  module Transactions
    module Comments
      class Delete < Transaction
        include Twist::Import["comment_repo"]

        def call(id:)
          comment_repo.delete(id)
          Success()
        end
      end
    end
  end
end
