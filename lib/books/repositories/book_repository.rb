class BookRepository < Hanami::Repository
  associations do
    has_many :branches
  end

  def find_by_permalink(permalink)
    books.where(permalink: permalink).limit(1).one!
  end

  def add_branch(book, data)
    assoc(:branches, book).add(data)
  end
end
