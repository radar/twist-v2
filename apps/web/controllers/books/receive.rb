module Web::Controllers::Books
  class Receive
    include Web::Action

    def call(params)
      book = find_book(params[:permalink])
      unless book
        self.status = 404
        self.body = JSON.generate(error: "Book not found")
        return
      end

      branch = find_or_create_branch(book.id, params[:ref])
      BookWorker.perform_async(book.permalink, branch.name)
    end

    private

    def verify_csrf_token?
      false
    end

    def find_book(permalink)
      repo = BookRepository.new
      repo.find_by_permalink(permalink)
    end

    def find_or_create_branch(book_id, ref)
      branch = ref.split("/").last
      repo = BranchRepository.new
      repo.find_or_create_by_book_id_and_name(book_id, branch)
    end
  end
end
