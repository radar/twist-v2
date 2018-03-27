module Web::Controllers::Books
  class Create
    include Web::Action

    before :require_authentication!

    params do
      required(:book).schema do
        required(:title).filled
        required(:source).filled
        required(:format).filled
        required(:default_branch).filled
      end
    end

    def call(params)
      create_book = Web::Transactions::Books::Create.new
      create_book.(params[:book]) do |result|
        result.success do |book|
          flash[:notice] = "Book has been added."
          redirect_to routes.setup_webhook_book_path(id: book.permalink)
        end
      end
    end

    private

    def book_repo
      BookRepository.new
    end

    def branch_repo
      BranchRepository.new
    end
  end
end
