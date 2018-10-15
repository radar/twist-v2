module Web
  module GraphQL
    module Mutations
      module Note
        class Submit
          def call(note_repo:, current_user:, element_id:, text:)
            note_repo.create(
              state: "open",
              user_id: current_user,
              element_id: element_id,
              text: text,
            )
          end
        end

        class Close
          def call(note_repo, id)
            note_repo.close(id)
          end
        end

        class Open
          def call(note_repo, id)
            note_repo.open(id)
          end
        end
      end
    end
  end
end
