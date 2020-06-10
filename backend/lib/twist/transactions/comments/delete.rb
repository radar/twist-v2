module Twist
  module Transactions
    module Comments
      class Delete
        include Dry::Transaction
        include Twist::Import["comment_repo"]

        step :delete

        def delete(id:)
          comment_repo.delete(id)
          Success()
        end
      end
    end
  end
end
