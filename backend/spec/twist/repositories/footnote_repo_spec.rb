require_relative '../../spec_helper'

module Twist
  module Repositories
    describe FootnoteRepo do
      context "find_or_create" do
        let(:book_repo) { BookRepo.new }
        let(:commit_repo) { CommitRepo.new }
        let(:footnote_repo) { FootnoteRepo.new }

        let(:book) { book_repo.create(permalink: "markdown_book_test") }
        let(:branch) { book_repo.add_branch(book, name: "master") }
        let(:commit) { commit_repo.create(sha: "abc123", branch_id: branch.id) }

        context "when a footnote does not exist already" do
          it "creates a new footnote" do
            expect(footnote_repo.footnotes.count).to eq(0)
            footnote_repo.find_or_create(
              commit_id: commit.id,
              identifier: "footnote_1",
              content: "footnote"
            )

            expect(footnote_repo.footnotes.count).to eq(1)
          end
        end

        context "when a footnote exists with the same identifier" do
          before do
            footnote_repo.create(
              commit_id: commit.id,
              identifier: "footnote_1",
              content: "footnote"
            )
          end

          it "does not create a second footnote" do
            expect(footnote_repo.footnotes.count).to eq(1)
            footnote_repo.find_or_create(
              commit_id: commit.id,
              identifier: "footnote_1",
              content: "footnote"
            )

            expect(footnote_repo.footnotes.count).to eq(1)
          end
        end
      end
    end
  end
end
