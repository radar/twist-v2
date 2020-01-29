module Twist
  class CommentRepository < Twist::Repository[:comments]
    def by_note_id(id)
      comments.where(note_id: id).to_a
    end
  end
end
