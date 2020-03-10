require "spec_helper"

module Twist
  RSpec.describe BookUpdater do
    context "when a note exists" do
      let(:book_repo) { Repositories::BookRepo.new }
      let(:branch_repo) { Repositories::BranchRepo.new }
      let(:chapter_repo) { Repositories::ChapterRepo.new }
      let(:commit_repo) { Repositories::CommitRepo.new }
      let(:element_repo) { Repositories::ElementRepo.new }
      let(:user_repo) { Repositories::UserRepo.new }
      let(:note_repo) { Repositories::NoteRepo.new }

      let!(:book) do
        book_repo.create(
          title: "Asciidoc Book Test",
          permalink: "asciidoc-book-test",
          github_user: "radar",
          github_repo: "asciidoc_book_test",
        )
      end

      let!(:branch) { book_repo.add_branch(book, name: "master") }

      let!(:commit) do
        commit_repo.create(sha: "abc123", branch_id: branch.id)
      end

      let(:chapter) do
        chapter_repo.create(
          commit_id: commit.id,
          name: "Chapter 1",
        )
      end

      let(:element) do
        element_repo.create(tag: "p", chapter_id: chapter.id)
      end

      let(:user) { user_repo.create(email: "test@example.com") }

      let!(:note) do
        note_repo.create(
          element_id: element.id, user_id: user.id
        )
      end

      subject do
        described_class.new(
          permalink: book.permalink,
          branch: branch.name,
          username: book.github_user,
          repo: book.github_repo,
        )
      end

      let(:git) { double(Git) }

      before do
        allow(Git).to receive(:new) { git }
        allow(git).to receive(:fetch!) { commit.sha }
      end

      it "does not delete that note" do
        subject.update!

        notes = note_repo.count([element.id])
        expect(notes).to eq({ element.id => 1})
      end
    end
  end
end
