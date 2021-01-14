module Twist
  module Web
    module GraphQL
      module Mutations
        module Notes
          class Update < BaseMutation
            argument :id, ID, required: true
            argument :text, String, required: true

            type NoteType

            def resolve(id:, text:)
              note = context[:note_repo].find(id)
              if note.user_id != context[:current_user].id
                return note
              end

              update = Transactions::Notes::Update.new(
                note_repo: context[:note_repo],
              )
              update.(id: id, text: text).success
            end
          end
        end
      end
    end
  end
end
