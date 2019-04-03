class BookNoteRepository < Hanami::Repository
  def by_book(book_id)
    book_notes.where(book_id: book_id)
  end

  def count_for_book(book_id)
    by_book(book_id).count
  end

  def by_book_and_state(book_id, state)
    notes = book_notes.where(
      book_id: book_id,
      state: state,
    )

    reorder_notes(notes, state).to_a
  end

  def by_element_and_state(element_id, state)
    notes = book_notes.where(
      element_id: element_id,
      state: state,
    )
    reorder_notes(notes, state).to_a
  end

  def by_book_and_number(book_id, number)
    by_book(book_id).where(number: number).one
  end

  private

  def reorder_notes(notes, state)
    # When displaying open notes, it's helpful to see oldest first.
    # But when displaying closed notes, it makes sense to show those recently closed
    # (in case you want to review them or re-open them)
    if state == "open"
      notes.order { created_at.asc }
    else
      notes.order { updated_at.desc }
    end
  end
end
