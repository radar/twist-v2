require_relative '../../spec_helper'

describe CommitRepository do
  context "find_and_clean_or_create_commit" do
    let(:book_repo) { BookRepository.new }
    let(:chapter_repo) { double }

    let(:book) { book_repo.create(permalink: "markdown_book_test") }
    let(:branch) { book_repo.add_branch(book, name: "master") }

    let(:sha) { "abc123" }

    context "when the commit does not exist" do
      it "creates the commit" do
        commit = subject.find_and_clean_or_create(branch.id, sha, chapter_repo)
        expect(commit.sha).to eq("abc123")
        expect(commit.branch_id).to eq(branch.id)
      end
    end

    context "when the commit exists" do
      let!(:existing_commit) do
        subject.create(sha: sha, branch_id: branch.id)
      end

      it "finds that commit" do
        expect(chapter_repo).to receive(:wipe)
        commit = subject.find_and_clean_or_create(branch.id, sha, chapter_repo)
        expect(commit.id).to eq(existing_commit.id)
      end

      context "and the commit has a related chapter" do
        let(:chapter_repo) { ChapterRepository.new }

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

          subject.find_and_clean_or_create(branch.id, sha, chapter_repo)

          expect(chapters.count).to eq(0)
        end
      end
    end
  end
end
