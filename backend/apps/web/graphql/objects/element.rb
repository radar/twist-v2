module Web
  module GraphQL
    module Types
      class NoteState < ::GraphQL::Schema::Enum
        value "OPEN", "Open notes"
        value "CLOSED", "Closed notes"
      end
    end

    class ElementType < ::GraphQL::Schema::Object
      require_relative 'chapter'
      require_relative 'image'
      require_relative 'note'

      graphql_name "Element"
      description "An element"

      field :id, ID, null: false
      field :content, String, null: true
      field :tag, String, null: false
      field :note_count, Integer, null: false
      field :image, ImageType, null: true
      field :chapter, ChapterType, null: false

      field :notes, [NoteType], null: false do
        argument :state, Types::NoteState, required: true
      end

      def image
        return nil if object.image_id.nil?

        context[:image_loader].load(object.image_id)
      end

      def note_count
        context[:note_count_loader].load(object.id)
      end

      def notes(state:)
        context[:book_note_repo].by_element_and_state(object.id, state.downcase)
      end

      def chapter
        context[:chapter_repo].by_id(object.chapter_id)
      end
    end
  end
end
