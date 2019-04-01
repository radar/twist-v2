class CommentRepository < Hanami::Repository
  def by_note_id(id)
    comments.where(note_id: id).to_a
  end
end
