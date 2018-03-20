module Web::Controllers::Books
  class Create
    include Web::Action

    before :require_authentication!

    params do
      required(:book).schema do
        required(:title).filled
        required(:source).filled
      end
    end

    def call(params)
      book_params = params[:book]
      permalink = Books::Permalinker.new(book_params[:title]).permalink
      book = book_repo.create(book_params.merge(permalink: permalink))
      flash[:notice] = "Book has been added."
      redirect_to routes.setup_webhook_book_path(id: book.permalink)
    end

    private

    def book_repo
      BookRepository.new
    end
  end
end
