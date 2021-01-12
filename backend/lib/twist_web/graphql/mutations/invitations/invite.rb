module Twist
  module Web
    module GraphQL
      module Mutations
        module Invitations
          class Invite < BaseMutation
            argument :book_id, ID, required: true
            argument :user_id, ID, required: true

            type InvitationType

            def resolve(book_id:, user_id:)
              invite = Transactions::Invitations::Invite.new(
                permission_repo: context[:permission_repo],
                current_user: context[:current_user],
              )
              invite.(book_id: book_id, user_id: user_id).success
            end
          end
        end
      end
    end
  end
end
