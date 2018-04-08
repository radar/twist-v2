class BookNoteRepository < Hanami::Repository
  def by_book(book_id)
    book_notes.where(book_id: book_id)
  end

  def by_element(element_id)
    book_notes.where(element_id: element_id)
  end
end
