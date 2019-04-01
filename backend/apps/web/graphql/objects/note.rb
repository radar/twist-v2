module Web
  module GraphQL
    class NoteType < ::GraphQL::Schema::Object
      require_relative 'comment'
      require_relative 'element'
      require_relative 'user'

      graphql_name "Note"
      description "A note"

      field :id, ID, null: false
      field :createdAt, String, null: false
      field :state, String, null: false
      field :text, String, null: false
      field :user, UserType, null: false

      field :element, ElementType, null: false
      field :comments, [CommentType], null: false

      def created_at
        object.created_at.iso8601
      end

      def user
        context[:user_loader].load(object.user_id)
      end

      def element
        context[:element_loader].load(object.element_id)
      end

      def comments
        context[:comment_repo].by_note_id(object.id)
      end
    end
  end
end
