class BookNoteRepository < Hanami::Repository
  def by_book(book_id)
    book_notes.where(book_id: book_id)
  end

  def by_book_and_state(book_id, state)
    notes = book_notes.where(
      book_id: book_id,
      state: state,
    )

    # When displaying open notes, it's helpful to see oldest first.
    # But when displaying closed notes, it makes sense to show those recently closed
    # (in case you want to review them or re-open them)
    notes = if state == "open"
              notes.order { updated_at.asc }
            else
              notes.order { updated_at.desc }
            end

    notes.to_a
  end

  def by_element_and_state(element_id, state)
    book_notes.where(
      element_id: element_id,
      state: state,
    ).to_a
  end

  def by_book_and_id(book_id, id)
    by_book(book_id).where(id: id).one
  end
end
