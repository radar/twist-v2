require_relative 'invite_permission_result'

module Twist
  module Web
    module GraphQL
      module Mutations
        module Invitations
          class Invite < BaseMutation
            argument :book_id, ID, required: true
            argument :user_id, ID, required: true

            type InvitePermissionResult

            def resolve(book_id:, user_id:)
              invite = Transactions::Invitations::Invite.new(
                permission_repo: context[:permission_repo],
              )
              invite.(
                inviter: context[:current_user],
                book_id: book_id,
                user_id: user_id,
              )
            end
          end
        end
      end
    end
  end
end
