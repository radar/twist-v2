module Twist
  module Web
    module GraphQL
      module Mutations
        module Notes
          class Submit < BaseMutation
            argument :book_id, ID, required: true
            argument :element_id, ID, required: true
            argument :text, String, required: true

            type NoteType

            def resolve(book_id:, element_id:, text:)
              submit = Transactions::Notes::Submit.new(note_repo: context[:note_repo])
              submit.(
                user_id: context[:current_user].id,
                book_id: book_id,
                element_id: element_id,
                text: text,
              ).success
            end
          end
        end
      end
    end
  end
end
