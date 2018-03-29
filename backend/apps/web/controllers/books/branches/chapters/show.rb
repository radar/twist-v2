module Web
  module Controllers
    module Books
      module Branches
        module Chapters
          class Show
            include Web::Action

            before :require_authentication!

            expose :book, :branch, :chapter, :previous_chapter, :next_chapter

            # rubocop:disable Metrics/AbcSize
            def call(params)
              @book = find_book(params[:book_id])
              @branch = find_branch(book.id, params[:branch_id])
              commit = latest_commit(branch.id)
              @chapter = find_chapter(commit.id, params[:id])
              @previous_chapter = find_previous_chapter(commit.id, @chapter)
              @next_chapter = find_next_chapter(commit.id, @chapter)
            end
            # rubocop:enable Metrics/AbcSize

            private

            def find_book(permalink)
              repo = BookRepository.new
              repo.find_by_permalink(permalink)
            end

            def find_branch(book_id, name)
              repo = BranchRepository.new
              repo.find_by_book_id_and_name(book_id, name)
            end

            def latest_commit(branch_id)
              repo = CommitRepository.new
              repo.latest_for_branch(branch_id)
            end

            def chapter_repo
              @chapter_repo ||= ChapterRepository.new
            end

            def find_chapter(commit_id, permalink)
              chapter_repo.for_commit_and_permalink_with_elements(commit_id, permalink)
            end

            def find_previous_chapter(commit_id, chapter)
              chapter_repo.previous_chapter(commit_id, chapter)
            end

            def find_next_chapter(commit_id, chapter)
              chapter_repo.next_chapter(commit_id, chapter)
            end
          end
        end
      end
    end
  end
end
