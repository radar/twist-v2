module Twist
  module Web
    module GraphQL
      module Mutations
        module Comments
          class Update < BaseMutation
            argument :id, ID, required: true
            argument :text, String, required: true

            type CommentType

            def resolve(id:, text:)
              comment = context[:comment_repo].find(id)
              if comment.user_id != context[:current_user].id
                return comment
              end

              update_comment = Transactions::Comments::Update.new(
                comment_repo: context[:comment_repo],
              )
              update_comment.(
                id: id,
                text: text,
              ).success
            end
          end
        end
      end
    end
  end
end
