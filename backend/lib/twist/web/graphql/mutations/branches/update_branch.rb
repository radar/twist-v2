module Twist
  module Web
    module GraphQL
      module Mutations
        module Branches
          class UpdateBranch < BaseMutation
            graphql_name "UpdateBranch"

            argument :book_permalink, String, required: true
            argument :branch_name, String, required: true

            type Types::Branch

            def resolve(book_permalink:, branch_name:)
              update_branch = Transactions::Branches::Update.new
              update_branch.(
                current_user: context[:current_user],
                book_permalink: book_permalink,
                branch_name: branch_name,
              ).success
            end
          end
        end
      end
    end
  end
end
