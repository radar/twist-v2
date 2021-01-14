module Twist
  module Web
    module GraphQL
      module Mutations
        module Notes
          class Open < BaseMutation
            argument :id, ID, required: true

            type NoteType

            def resolve(id:)
              open = Transactions::Notes::Open.new(
                note_repo: context[:note_repo],
              )
              open.(id: id).success
            end
          end
        end
      end
    end
  end
end
