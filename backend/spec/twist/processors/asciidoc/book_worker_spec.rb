require "spec_helper"

module Twist
  module Processors
    module Asciidoc
      describe BookWorker do
        let(:book_repo) { Repositories::BookRepo.new }
        let(:branch_repo) { Repositories::BranchRepo.new }
        let(:chapter_repo) { Repositories::ChapterRepo.new }
        let(:commit_repo) { Repositories::CommitRepo.new }
        let(:footnote_repo) { Repositories::FootnoteRepo.new }

        context "with test book" do
          let!(:book) do
            book_repo.create(
              title: "Asciidoc Book Test",
              github_user: "radar",
              github_repo: "asciidoc_book_test",
            )
          end

          let!(:branch) { book_repo.add_branch(book, name: "master") }

          it "can process the book" do
            subject.perform(
              "permalink" => book.permalink,
              "branch" => branch.name,
              "github_path" => "radar/asciidoc_book_test",
            )

            commit = commit_repo.latest_for_branch(branch.id)
            expect(commit.message).not_to be_nil
            frontmatter_titles = chapter_repo.for_commit_and_part(commit.id, "frontmatter").map(&:title)

            expect(frontmatter_titles).to eq(["Preface / Introduction"])

            mainmatter_chapters = chapter_repo.for_commit_and_part(commit.id, "mainmatter")
            expect(mainmatter_chapters.first.position).to eq(1)

            mainmatter_titles = mainmatter_chapters.map(&:title)
            expect(mainmatter_titles).to eq(["Chapter 1"])

            backmatter_titles = chapter_repo.for_commit_and_part(commit.id, "backmatter").map(&:title)
            expect(backmatter_titles).to eq(["Appendix A: The First Appendix"])

            footnotes = footnote_repo.for_commit(commit.id)
            expect(footnotes.count).to eq(1)
            expect(footnotes.first.content).to include("Footnotes should appear at the end of chapters")
          end
        end

        context "with the Rails book", integration: true do
          let!(:book) do
            book_repo.create(
              title: "Rails 4 in Action",
              github_user: "rubysherpas",
              github_repo: "rails_book",
            )
          end

          let!(:branch) { book_repo.add_branch(book, name: "master") }

          it "can process the book" do
            subject.perform(
              "permalink" => book.permalink,
              "branch" => branch.name,
              "github_path" => "rubysherpas/rails_book",
            )

            commit = commit_repo.latest_for_branch(branch.id)

            frontmatter_titles = chapter_repo.for_commit_and_part(commit.id, "frontmatter").map(&:title)
            expect(frontmatter_titles).to eq(["Preface", "Acknowledgements", "About this book"])

            mainmatter_titles = chapter_repo.for_commit_and_part(commit.id, "mainmatter").map(&:title)
            expect(mainmatter_titles).to include("Ruby on Rails, the framework")

            backmatter_titles = chapter_repo.for_commit_and_part(commit.id, "backmatter").map(&:title)
            expect(backmatter_titles).to eq(["Appendix A: Installation Guide", "Appendix B: Why Rails?"])
          end
        end
      end
    end
  end
end
