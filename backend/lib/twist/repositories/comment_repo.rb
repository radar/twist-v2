module Twist
  module Repositories
    class CommentRepo < Twist::Repository[:comments]
      commands :create, update: :by_pk, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

      def find(id)
        comments.by_pk(id).first
      end

      def delete(id)
        comments.where(id: id).delete
      end

      def by_note_id(id)
        comments.where(note_id: id).to_a
      end
    end
  end
end
