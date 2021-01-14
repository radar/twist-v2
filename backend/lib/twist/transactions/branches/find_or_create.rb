module Twist
  module Transactions
    module Branches
      class FindOrCreate
        include Import["repositories.branch_repo"]
        def call(book_id:, ref:)
          branch = ref.split("/").last
          branch_repo.find_or_create_by_book_id_and_name(book_id, branch)
        end
      end
    end
  end
end
