module Web::Controllers::Books
  class SetupWebhook
    include Web::Action
    before :require_authentication!

    expose :book

    def call(params)
      @book = find_book(params[:id])
    end

    private

    def find_book(permalink)
      book_repo = BookRepository.new
      book_repo.find_by_permalink(permalink)
    end
  end
end
