class NoteRepository < Hanami::Repository
  def count(element_id)
    notes.where(element_id: element_id).count
  end
end
