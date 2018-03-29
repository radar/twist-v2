require_relative '../../spec_helper'

describe ChapterRepository do
  let(:book_repo) { BookRepository.new }
  let(:branch_repo) { BranchRepository.new }
  let(:commit_repo) { CommitRepository.new }

  let(:book) { book_repo.create(title: "Markdown Book Test") }
  let(:branch) { branch_repo.create(book_id: book.id, name: "master") }
  let(:commit) { commit_repo.create(branch_id: branch.id) }

  context "previous_chapter" do
    it "finds previous chapter within the same part" do
      current_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 2)
      previous_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1)

      expect(subject.previous_chapter(commit.id, current_chapter)).to eq(previous_chapter)
    end

    it "finds the previous chapter in the previous part" do
      current_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1)
      previous_chapter = subject.create(commit_id: commit.id, part: "frontmatter", position: 1)

      expect(subject.previous_chapter(commit.id, current_chapter)).to eq(previous_chapter)
    end
  end

  context "next_chapter" do
    it "finds next chapter within the same part" do
      current_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1)
      next_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 2)

      expect(subject.next_chapter(commit.id, current_chapter)).to eq(next_chapter)
    end

    it "finds the next chapter in the next part" do
      current_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1)
      next_chapter = subject.create(commit_id: commit.id, part: "backmatter", position: 1)

      expect(subject.next_chapter(commit.id, current_chapter)).to eq(next_chapter)
    end
  end
end
