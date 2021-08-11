module Twist
  module Web
    module GraphQL
      module Mutations
        module Comments
          class Add < BaseMutation
            argument :note_id, ID, required: true
            argument :text, String, required: true

            type Types::Comment

            def resolve(note_id:, text:)
              add_comment = Transactions::Comments::Add.new(
                comment_repo: context[:comment_repo],
              )
              add_comment.(
                current_user: context[:current_user],
                note_id: note_id,
                text: text,
              ).success
            end
          end
        end
      end
    end
  end
end
