module Web::Controllers::Books
  class Index
    include Web::Action
    before :require_authentication!

    expose :books
    expose :default_branches

    def call(params)
      @books = all_books.to_a
      @default_branches = get_default_branches(@books.map(&:id))
    end

    private

    def all_books
      repo = BookRepository.new
      repo.ordered_by_title
    end

    def get_default_branches(book_ids)
      repo = BranchRepository.new
      branches = repo.default_for_books(book_ids).to_a.map do |branch|
        [branch.book_id, branch]
      end
      branches.to_h
    end
  end
end
