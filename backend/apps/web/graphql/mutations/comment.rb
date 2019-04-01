module Web
  module GraphQL
    module Mutations
      module Comment
        class Add
          def call(comment_repo:, current_user:, note_id:, text:)
            comment_repo.create(
              user_id: current_user.id,
              note_id: note_id,
              text: text,
            )
          end
        end
      end
    end
  end
end
