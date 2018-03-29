module Web::Views::Books
  class Index
    include Web::View

    def default_branch(book)
      book.branches.detect(&:default)&.name
    end
  end
end
