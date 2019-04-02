module Web
  module GraphQL
    module Mutations
      module Notes
        class Close < BaseMutation
          argument :id, ID, required: true

          type NoteType

          def resolve(id:)
            close = Transactions::Notes::Close.new(
              note_repo: context[:note_repo],
              current_user: context[:current_user],
            )
            close.(id: id).success
          end
        end
      end
    end
  end
end
