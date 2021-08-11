module Twist
  module Web
    module GraphQL
      module Mutations
        module Notes
          class Submit < BaseMutation
            argument :book_permalink, ID, required: true
            argument :element_id, ID, required: true
            argument :text, String, required: true

            type Types::Note

            def resolve(book_permalink:, element_id:, text:)
              submit = Transactions::Notes::Submit.new(
                book_repo: context[:book_repo],
                note_repo: context[:note_repo],
              )

              submit.(
                user_id: context[:current_user].id,
                book_permalink: book_permalink,
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
