module Web::Controllers::Books
  class Show
    include Web::Action

    def call(params)
      book = find_book(params[:book_id])
      @frontmatter = frontmatter(commit_id)
      @mainmatter = mainmatter(commit_id)
      @backmatter = backmatter(book_id)
    end

    private

    def find_book(permalink)
      repo = BookRepository.new
      repo.find_by_permalink(permalink)
    end

    def chapter_repo
      @chapter_repo ||= ChapterRepository.new
    end

    def frontmatter
      chapter_repo.frontmatter(book_id)
    end

    def mainmatter
      chapter_repo.mainmatter(book_id)
    end

    def backmatter
      chapter_repo.backmatter(book_id)
    end
  end
end
