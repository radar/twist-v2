module Web
  module GraphQL
    module Resolvers
      module Element
        class ByBook
          def call(bookPermalink:, state:)
            notes = Note::ByBookAndState.new(bookPermalink, state)

            element_repo = ElementRepository.new
            element_repo.by_ids(notes.to_a.map(&:element_id).uniq)
          end
        end

        class ByID
          def call(note, _args, _ctx)
            element_repo = ElementRepository.new
            element_repo.by_id(note.element_id)
          end
        end

        class Image
          def call(element, _args, ctx)
            return nil if element.image_id.nil?
            ctx[:image_loader].load(element.image_id)
          end
        end
      end
    end
  end
end
