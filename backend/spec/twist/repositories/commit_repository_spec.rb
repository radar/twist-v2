require_relative '../../spec_helper'

module Twist
  module Repositories
    describe CommitRepo do
      context "find_and_clean_or_create_commit" do
        let(:book_repo) { BookRepo.new }
        let(:chapter_repo) { double }

        let(:book) { book_repo.create(permalink: "markdown_book_test") }
        let(:default_branch) { book_repo.add_branch(book, name: "master", default: true) }

        let(:sha) { "abc123" }

        context "when the commit does not exist" do
          it "creates the commit" do
            commit = subject.find_and_clean_or_create(default_branch.id, sha, chapter_repo)
            expect(commit.sha).to eq("abc123")
            expect(commit.branch_id).to eq(default_branch.id)
          end
        end

        context "when the commit exists" do
          let!(:existing_commit) do
            subject.create(sha: sha, branch_id: default_branch.id)
          end

          it "finds that commit" do
            expect(chapter_repo).to receive(:mark_as_superseded)
            commit = subject.find_and_clean_or_create(default_branch.id, sha, chapter_repo)
            expect(commit.id).to eq(existing_commit.id)
          end

          context "and the commit has a related chapter" do
            let(:chapter_repo) { ChapterRepo.new }

            before do
              chapter_repo.create(
                commit_id: existing_commit.id,
                name: "Chapter 1",
              )
            end

            def chapters
              chapter_repo.for_commit(existing_commit.id)
            end

            it "deletes the chapter" do
              expect(chapters.count).to eq(1)

              subject.find_and_clean_or_create(default_branch.id, sha, chapter_repo)

              expect(chapters.count).to eq(0)
            end
          end
        end
      end

      context "latest_for_default_branch" do
        let(:book_repo) { BookRepo.new }
        let(:chapter_repo) { double }

        let(:book) { book_repo.create(permalink: "markdown_book_test") }
        let(:default_branch) { book_repo.add_branch(book, name: "master", default: true) }
        let(:other_branch) { book_repo.add_branch(book, name: "master", default: false) }

        before do
          subject.create(branch_id: default_branch.id, sha: "abc123")
          subject.create(branch_id: other_branch.id, sha: "def345")
        end

        it "finds the latest commit" do
          latest_commit = subject.latest_for_default_branch(book.id)
          expect(latest_commit.sha).to eq("abc123")
        end
      end
    end
  end
end
