module Web::Controllers::Books
  class Index
    include Web::Action
    before :require_authentication!

    expose :books

    def call(_params)
      @books = all_books.to_a
    end

    private

    def all_books
      repo = BookRepository.new
      repo.ordered_by_title_with_branches
    end
  end
end
