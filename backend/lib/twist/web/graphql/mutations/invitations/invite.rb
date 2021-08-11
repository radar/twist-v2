module Twist
  module Web
    module GraphQL
      module Mutations
        module Invitations
          class Invite < BaseMutation
            argument :book_id, ID, required: true
            argument :user_id, ID, required: true

            field :book_id, ID, null: true
            field :user_id, ID, null: true
            field :error, String, null: true

            def resolve(book_id:, user_id:)
              invite = Transactions::Invitations::Invite.new(
                permission_repo: context[:permission_repo],
              )
              result = invite.(
                inviter: context[:current_user],
                book_id: book_id,
                user_id: user_id,
              )

              handle_result(result) do
                {
                  book_id: book_id,
                  user_id: user_id,
                }
              end
            end
          end
        end
      end
    end
  end
end
