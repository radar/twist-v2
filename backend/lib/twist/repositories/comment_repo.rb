module Twist
  module Repositories
    class CommentRepo < Twist::Repository[:comments]
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

      def by_note_id(id)
        comments.where(note_id: id).to_a
      end
    end
  end
end
