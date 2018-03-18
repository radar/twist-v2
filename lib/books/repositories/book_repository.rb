class BookRepository < Hanami::Repository
  def find_by_permalink(permalink)
    books.where(permalink: permalink).limit(1).one!
  end
end
