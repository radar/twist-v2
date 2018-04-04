module Books
  module GraphQL
    module Resolvers
      module Notes
        class Count
          def call(element, _args, _ctx)
            note_repo = NoteRepository.new
            note_repo.count(element.id)
          end
        end

        class Submit
          def call(_obj, args, ctx)
            note_repo = NoteRepository.new
            note_repo.create(
              user_id: ctx[:current_user].id,
              element_id: args["elementID"],
              text: args["text"]
            )
          end
        end
      end
    end
  end
end
