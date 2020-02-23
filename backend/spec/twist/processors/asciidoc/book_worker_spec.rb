require "spec_helper"

module Twist
  module Asciidoc
    describe BookWorker do
      let(:book_repo) { Repositories::BookRepo.new }
      let(:branch_repo) { Repositories::BranchRepo.new }
      let(:chapter_repo) { Repositories::ChapterRepo.new }
      let(:commit_repo) { Repositories::CommitRepo.new }

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
          frontmatter_titles = chapter_repo.for_commit_and_part(commit.id, "frontmatter").map(&:title)

          expect(frontmatter_titles).to eq(["Preface / Introduction"])

          mainmatter_titles = chapter_repo.for_commit_and_part(commit.id, "mainmatter").map(&:title)
          expect(mainmatter_titles).to eq(["Chapter 1"])

          backmatter_titles = chapter_repo.for_commit_and_part(commit.id, "backmatter").map(&:title)
          expect(backmatter_titles).to eq(["Appendix A: The First Appendix"])
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
          expect(mainmatter_titles).to eq(
            [
              "Ruby on Rails, the framework",
              "Testing saves your bacon",
              "Developing a real Rails application",
              "Oh, CRUD!",
              "Nested resources",
              "Authentication",
              "Basic access control",
              "Fine-grained access control",
              "File uploading",
              "Tracking state",
              "Tagging",
              "Sending email",
              "Deployment",
              "Designing an API",
              "Rack-based applications",
            ]
          )

          backmatter_titles = chapter_repo.for_commit_and_part(commit.id, "backmatter").map(&:title)
          expect(backmatter_titles).to eq(["Appendix A: Installation Guide", "Appendix B: Why Rails?"])
        end
      end
    end
  end
end
