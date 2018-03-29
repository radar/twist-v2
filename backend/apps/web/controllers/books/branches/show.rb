module Web
  module Controllers
    module Books
      module Branches
        class Show
          include Web::Action
          before :require_authentication!

          expose :book, :branch, :frontmatter, :mainmatter, :backmatter

          # rubocop:disable Metrics/AbcSize
          def call(params)
            @book = find_book(params[:book_id])
            @branch = find_branch(book.id, params[:id])
            commit = latest_commit(branch.id)
            @frontmatter = frontmatter_chapters(commit.id)
            @mainmatter = mainmatter_chapters(commit.id)
            @backmatter = backmatter_chapters(book.id)
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

          def frontmatter_chapters(commit_id)
            chapter_repo.frontmatter(commit_id).to_a
          end

          def mainmatter_chapters(commit_id)
            chapter_repo.mainmatter(commit_id).to_a
          end

          def backmatter_chapters(commit_id)
            chapter_repo.backmatter(commit_id).to_a
          end
        end
      end
    end
  end
end
