class BranchRepository < Hanami::Repository
  def by_book(book_id)
    branches.where(book_id: book_id)
  end

  def find_by_book_id_and_name(book_id, name)
    by_book(book_id).where(name: name).limit(1).one
  end

  def find_or_create_by_book_id_and_name(book_id, name)
    find_by_book_id_and_name(book_id, name) || create(book_id: book_id, name: name)
  end

  def default_for_books(book_ids)
    branches.where(book_id: book_ids, default: true)
  end
end
