module Twist
  module Web
    module GraphQL
      module Mutations
        module Comments
          class Delete < BaseMutation
            argument :id, ID, required: true

            type CommentType

            def resolve(id:)
              comment = context[:comment_repo].find(id)
              if comment.user_id != context[:current_user].id
                return comment
              end

              delete_comment = Transactions::Comments::Delete.new(
                comment_repo: context[:comment_repo],
              )
              delete_comment.(
                id: id,
              ).success

              comment
            end
          end
        end
      end
    end
  end
end
