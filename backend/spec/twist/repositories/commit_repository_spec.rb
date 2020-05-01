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

        let(:markdown_book) { book_repo.create(permalink: "markdown_book_test") }
        let(:md_default_branch) { book_repo.add_branch(markdown_book, name: "master", default: true) }
        let(:md_other_branch) { book_repo.add_branch(markdown_book, name: "master", default: false) }

        let(:asciidoc_book) { book_repo.create(permalink: "asciidoc_book_test") }
        let(:ad_default_branch) { book_repo.add_branch(asciidoc_book, name: "master", default: true) }
        let(:ad_other_branch) { book_repo.add_branch(asciidoc_book, name: "master", default: false) }

        before do
          subject.create(branch_id: md_default_branch.id, sha: "abc123")
          subject.create(branch_id: md_default_branch.id, sha: "bca123")
          subject.create(branch_id: md_other_branch.id, sha: "def345")

          subject.create(branch_id: ad_default_branch.id, sha: "cba123")
          subject.create(branch_id: ad_default_branch.id, sha: "def123")
          subject.create(branch_id: ad_other_branch.id, sha: "fed345")
        end

        it "finds the latest commit" do
          latest_commit = subject.latest_for_default_branch(markdown_book.id)
          expect(latest_commit.sha).to eq("bca123")

          latest_commit = subject.latest_for_default_branch(asciidoc_book.id)
          expect(latest_commit.sha).to eq("def123")
        end
      end

      context "by_book_and_sha" do
        let(:book_repo) { BookRepo.new }
        let(:chapter_repo) { double }

        let(:markdown_book) { book_repo.create(permalink: "markdown_book_test") }
        let(:md_default_branch) { book_repo.add_branch(markdown_book, name: "master", default: true) }

        let(:asciidoc_book) { book_repo.create(permalink: "asciidoc_book_test") }
        let(:ad_default_branch) { book_repo.add_branch(asciidoc_book, name: "master", default: true) }

        before do
          subject.create(branch_id: md_default_branch.id, sha: "abc123")
          subject.create(branch_id: md_default_branch.id, sha: "bca123")

          subject.create(branch_id: ad_default_branch.id, sha: "fff123")
          subject.create(branch_id: ad_default_branch.id, sha: "eee123")
        end

        it "finds the specified commit" do
          commit = subject.by_book_and_sha(markdown_book.id, "abc123")
          expect(commit.sha).to eq("abc123")
        end

        it "does not find a commit from another book" do
          commit = subject.by_book_and_sha(markdown_book.id, "fff123")
          expect(commit).to be_nil
        end
      end

      context "for_ref" do
        let(:book_repo) { BookRepo.new }
        let(:chapter_repo) { double }

        let(:markdown_book) { book_repo.create(permalink: "markdown_book_test") }
        let(:md_default_branch) { book_repo.add_branch(markdown_book, name: "master", default: true) }

        let(:asciidoc_book) { book_repo.create(permalink: "asciidoc_book_test") }
        let(:ad_default_branch) { book_repo.add_branch(asciidoc_book, name: "master", default: true) }

        before do
          subject.create(branch_id: md_default_branch.id, sha: "abc123")
          subject.create(branch_id: md_default_branch.id, sha: "bca123")

          subject.create(branch_id: ad_default_branch.id, sha: "fff123")
          subject.create(branch_id: ad_default_branch.id, sha: "eee123")
        end

        it "finds the latest commit" do
          commit = subject.latest_for_book_and_ref(markdown_book.id, "master")
          expect(commit.sha).to eq("bca123")
        end
      end
    end
  end
end
