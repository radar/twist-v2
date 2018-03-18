class BranchRepository < Hanami::Repository
  def find_or_create_by_book_id_and_name(book_id, name)
    fields = { book_id: book_id, name: name }
    branch = branches.where(fields).limit(1).one
    branch || create(fields)
  end
end
